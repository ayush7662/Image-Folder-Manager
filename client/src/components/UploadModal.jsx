import { useState } from "react";
import "./UploadModal.css";

const UploadModal = ({ open, onClose, onSubmit, selectedFolder }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !image) {
      setError("Image name and file are required.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      await onSubmit({ name, image });
      setName("");
      setImage(null);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="upload-overlay">
      <form onSubmit={handleSubmit} className="upload-card">
        <h3 className="upload-title">Upload image</h3>
        <p className="upload-subtitle">Destination folder: {selectedFolder?.name}</p>
        <div className="upload-fields">
          <input
            className="upload-input"
            placeholder="Image name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="upload-input"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />
          {error && <p className="upload-error">{error}</p>}
          <div className="upload-actions">
            <button type="button" onClick={onClose} className="upload-btn upload-btn-secondary">
              Cancel
            </button>
            <button
              disabled={submitting}
              className="upload-btn upload-btn-primary"
            >
              {submitting ? "Uploading..." : "Upload"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UploadModal;
