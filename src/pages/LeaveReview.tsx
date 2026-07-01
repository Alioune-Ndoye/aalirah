import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import Seo from '../components/Seo';
import { saveReview, blobToDataUrl, apiEnabled, submitReviewRemote } from '../lib/reviewStore';
import { site } from '../lib/site';

type VideoState = 'none' | 'live' | 'recorded';

export default function LeaveReview() {
  // Job reference from the link we'd text/email, e.g. /review?job=A1029
  const [jobRef, setJobRef] = useState<string | null>(null);

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [name, setName] = useState('');
  const [area, setArea] = useState('');
  const [text, setText] = useState('');

  const [videoState, setVideoState] = useState<VideoState>('none');
  const [recording, setRecording] = useState(false);
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [camError, setCamError] = useState<string | null>(null);

  const [submitted, setSubmitted] = useState(false);
  const [warning, setWarning] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const liveRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setJobRef(params.get('job') || params.get('ref'));
  }, []);

  // Clean up camera + object URLs on unmount.
  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
      if (videoUrl) URL.revokeObjectURL(videoUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function startCamera() {
    setCamError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: true,
      });
      streamRef.current = stream;
      setVideoState('live');
      // Attach after render so the <video> exists.
      requestAnimationFrame(() => {
        if (liveRef.current) {
          liveRef.current.srcObject = stream;
          liveRef.current.play().catch(() => {});
        }
      });
    } catch {
      setCamError('We could not access your camera. You can upload a video file instead.');
    }
  }

  function startRecording() {
    const stream = streamRef.current;
    if (!stream) return;
    chunksRef.current = [];
    const mime = MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
      ? 'video/webm;codecs=vp9'
      : MediaRecorder.isTypeSupported('video/webm')
        ? 'video/webm'
        : '';
    const rec = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined);
    rec.ondataavailable = (e) => e.data.size && chunksRef.current.push(e.data);
    rec.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: mime || 'video/webm' });
      finishWithBlob(blob);
      streamRef.current?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    };
    recorderRef.current = rec;
    rec.start();
    setRecording(true);
  }

  function stopRecording() {
    recorderRef.current?.stop();
    setRecording(false);
  }

  function finishWithBlob(blob: Blob) {
    if (videoUrl) URL.revokeObjectURL(videoUrl);
    setVideoBlob(blob);
    setVideoUrl(URL.createObjectURL(blob));
    setVideoState('recorded');
  }

  function onUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    finishWithBlob(file);
  }

  function retake() {
    if (videoUrl) URL.revokeObjectURL(videoUrl);
    setVideoUrl(null);
    setVideoBlob(null);
    setVideoState('none');
  }

  const canSubmit = rating > 0 && (text.trim().length > 0 || !!videoBlob) && name.trim().length > 0;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit || busy) return;
    setBusy(true);
    setWarning(null);

    const base = {
      name: name.trim(),
      role: area.trim() || `${site.city} client`,
      rating,
      text: text.trim() || 'Shared a video review.',
    };

    // Backend path: send the structured review to the secured MongoDB API.
    if (apiEnabled()) {
      const res = await submitReviewRemote({ ...base, jobRef: jobRef ?? undefined });
      setBusy(false);
      if (res.ok) {
        if (videoBlob) {
          // Recorded/uploaded files need object storage (the next backend step).
          setWarning('We saved your written review. Uploading the video to our servers is coming soon.');
        }
        streamRef.current?.getTracks().forEach((t) => t.stop());
        setSubmitted(true);
      } else {
        setWarning(res.error);
      }
      return;
    }

    // Local fallback (no backend configured): keep the full demo, incl. video.
    let video: string | undefined;
    if (videoBlob) {
      try {
        video = await blobToDataUrl(videoBlob);
      } catch {
        /* fall through — submit text only */
      }
    }

    let res = saveReview(video ? { ...base, video } : base);
    if (!res.ok && res.reason === 'quota' && video) {
      res = saveReview(base);
      setWarning('Your video was a bit large for this demo, so we saved your written review. (A real backend would store the full clip.)');
    }

    setBusy(false);
    if (res.ok) {
      streamRef.current?.getTracks().forEach((t) => t.stop());
      setSubmitted(true);
    } else {
      setWarning('Something went wrong saving your review. Please try again.');
    }
  }

  if (submitted) {
    return (
      <>
        <Seo title={`Thank You — ${site.name}`} description="Thank you for your review." path="/review" noindex />
        <section className="bg-ivory" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
          <div className="wrap text-center" style={{ maxWidth: 620 }}>
            <div
              className="mx-auto mb-7 flex items-center justify-center"
              style={{ width: 84, height: 84, borderRadius: '50%', background: 'rgba(120,160,120,0.15)', color: 'var(--mint-dark)' }}
            >
              <Icon name="check-circle" size={42} />
            </div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem,5vw,3rem)', color: 'var(--forest)', marginBottom: 14 }}>
              Thank you{name ? `, ${name.split(' ')[0]}` : ''}!
            </h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: 8 }}>
              Your review has been sent to {site.name} and will appear after a quick review.
            </p>
            {warning && (
              <p style={{ color: 'var(--mint-dark)', fontSize: '0.85rem', marginBottom: 8 }}>{warning}</p>
            )}
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: 30 }}>
              Mind sharing it on Facebook too? It helps your neighbors find us.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              {site.social?.facebook && site.social.facebook !== '#' && (
                <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="btn-dark">
                  <Icon name="facebook" size={15} /> Share on Facebook
                </a>
              )}
              <Link to="/reviews" className="btn-ghost" style={{ color: 'var(--forest)', borderColor: 'var(--border)' }}>
                See it on our Reviews page
                <Icon name="arrow" size={14} strokeWidth={2} />
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Seo
        title={`Leave a Review — ${site.name}`}
        description={`Tell us how your clean went. Write a review or record a quick video for ${site.name}.`}
        path="/review"
        noindex
      />

      <section className="bg-forest text-center" style={{ paddingTop: 'clamp(110px,16vh,160px)', paddingBottom: 'clamp(48px,8vh,80px)' }}>
        <div className="wrap" style={{ maxWidth: 680 }}>
          <span className="kicker" style={{ color: 'var(--mint)', letterSpacing: '0.18em', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase' }}>
            {jobRef ? `Service #${jobRef} · Complete` : 'Your clean is complete'}
          </span>
          <h1 className="section-heading-white" style={{ fontSize: 'clamp(2rem,5vw,3.2rem)', margin: '14px 0 12px' }}>
            How did we <em>do?</em>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 480, margin: '0 auto' }}>
            Thanks for choosing {site.name}. Leave a written review, record a quick video, or do both — it takes a minute.
          </p>
        </div>
      </section>

      <section className="bg-ivory py-16 md:py-20">
        <form
          onSubmit={onSubmit}
          className="wrap"
          style={{ maxWidth: 680, background: '#fff', border: '1px solid var(--border)', borderRadius: 24, padding: 'clamp(24px,4vw,40px)' }}
        >
          {/* Rating */}
          <label className="block mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: 'var(--forest)' }}>
            Your rating <span style={{ color: 'var(--mint-dark)' }}>*</span>
          </label>
          <div className="flex gap-2 mb-7" onMouseLeave={() => setHover(0)}>
            {Array.from({ length: 5 }).map((_, i) => {
              const v = i + 1;
              const active = (hover || rating) >= v;
              return (
                <button
                  key={v}
                  type="button"
                  aria-label={`${v} star${v > 1 ? 's' : ''}`}
                  onMouseEnter={() => setHover(v)}
                  onClick={() => setRating(v)}
                  style={{ background: 'none', border: 0, cursor: 'pointer', color: active ? 'var(--mint)' : 'var(--border)', padding: 2, lineHeight: 0 }}
                >
                  <Icon name="star" size={34} fill={active} />
                </button>
              );
            })}
          </div>

          {/* Name + area */}
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block mb-2 text-sm" style={{ fontWeight: 600, color: 'var(--forest)' }}>
                Your name <span style={{ color: 'var(--mint-dark)' }}>*</span>
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane D."
                className="w-full"
                style={inputStyle}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm" style={{ fontWeight: 600, color: 'var(--forest)' }}>
                Town / area <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(optional)</span>
              </label>
              <input
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder={site.city}
                className="w-full"
                style={inputStyle}
              />
            </div>
          </div>

          {/* Written review */}
          <label className="block mb-2 text-sm" style={{ fontWeight: 600, color: 'var(--forest)' }}>
            Written review
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            placeholder="What did you think of the clean? What stood out?"
            className="w-full mb-8"
            style={{ ...inputStyle, resize: 'vertical' }}
          />

          {/* Video review */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-1">
              <Icon name="camera" size={16} className="text-forest" />
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: 'var(--forest)' }}>Video review</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>(optional)</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: 14 }}>
              Record a quick clip with your camera, or upload one from your device.
            </p>

            <div
              style={{
                borderRadius: 16,
                border: '1px dashed var(--border)',
                background: 'var(--cream)',
                padding: 16,
              }}
            >
              {videoState === 'live' && (
                <div>
                  <video ref={liveRef} muted playsInline style={mediaStyle} />
                  <div className="flex flex-wrap gap-3 mt-3">
                    {!recording ? (
                      <button type="button" onClick={startRecording} className="btn-dark" style={{ background: '#c0392b', borderColor: '#c0392b' }}>
                        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#fff', display: 'inline-block' }} /> Start recording
                      </button>
                    ) : (
                      <button type="button" onClick={stopRecording} className="btn-dark">
                        <span style={{ width: 10, height: 10, background: '#fff', display: 'inline-block' }} /> Stop
                      </button>
                    )}
                  </div>
                </div>
              )}

              {videoState === 'recorded' && videoUrl && (
                <div>
                  <video src={videoUrl} controls playsInline style={mediaStyle} />
                  <div className="flex flex-wrap gap-3 mt-3">
                    <button type="button" onClick={retake} className="btn-ghost" style={{ color: 'var(--forest)', borderColor: 'var(--border)' }}>
                      Retake / remove
                    </button>
                  </div>
                </div>
              )}

              {videoState === 'none' && (
                <div className="flex flex-wrap gap-3">
                  <button type="button" onClick={startCamera} className="btn-dark">
                    <Icon name="camera" size={15} /> Record a video
                  </button>
                  <label className="btn-ghost" style={{ color: 'var(--forest)', borderColor: 'var(--border)', cursor: 'pointer' }}>
                    Upload a file
                    <input type="file" accept="video/*" capture="user" onChange={onUpload} hidden />
                  </label>
                </div>
              )}

              {camError && <p style={{ color: '#c0392b', fontSize: '0.82rem', marginTop: 12 }}>{camError}</p>}
            </div>
          </div>

          {warning && <p style={{ color: '#c0392b', fontSize: '0.85rem', marginBottom: 14 }}>{warning}</p>}

          <button type="submit" disabled={!canSubmit || busy} className="btn-primary w-full justify-center" style={{ opacity: canSubmit && !busy ? 1 : 0.5 }}>
            {busy ? 'Sending…' : 'Submit review'}
            {!busy && <Icon name="arrow" size={14} strokeWidth={2} />}
          </button>
          {!canSubmit && (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', textAlign: 'center', marginTop: 10 }}>
              Add a star rating, your name, and a written or video review to submit.
            </p>
          )}
        </form>
      </section>
    </>
  );
}

const inputStyle: React.CSSProperties = {
  padding: '12px 14px',
  borderRadius: 12,
  border: '1px solid var(--border)',
  background: '#fff',
  color: 'var(--forest)',
  fontSize: '0.95rem',
  outline: 'none',
};

const mediaStyle: React.CSSProperties = {
  width: '100%',
  aspectRatio: '16 / 9',
  objectFit: 'cover',
  borderRadius: 12,
  background: '#000',
  display: 'block',
};
