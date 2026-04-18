import { useCallback, useEffect, useState } from "react";
import { ImagePlus, LogOut, Plus } from "lucide-react";
import api from "../lib/api";
import { useAuth } from "../context/AuthContext";
import FolderTree from "../components/FolderTree";
import UploadModal from "../components/UploadModal";
import "./DashboardPage.css";

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [images, setImages] = useState([]);
  const [folderName, setFolderName] = useState("");
  const [uploadOpen, setUploadOpen] = useState(false);

  const loadFolders = useCallback(async () => {
    const response = await api.get("/api/folders/tree");
    setFolders(response.data);
    if (!selectedFolder && response.data.length) {
      setSelectedFolder(response.data[0]);
    }
  }, [selectedFolder]);

  const loadImages = useCallback(async (folderId) => {
    if (!folderId) return;
    const response = await api.get(`/api/images/folder/${folderId}`);
    setImages(response.data);
  }, []);

  useEffect(() => {
    loadFolders();
  }, [loadFolders]);

  useEffect(() => {
    if (selectedFolder?._id) {
      loadImages(selectedFolder._id);
    } else {
      setImages([]);
    }
  }, [loadImages, selectedFolder?._id]);

  const createFolder = async (event) => {
    event.preventDefault();
    if (!folderName) return;
    await api.post("/api/folders", {
      name: folderName,
      parentFolderId: selectedFolder?._id || null
    });
    setFolderName("");
    await loadFolders();
  };

  const handleUpload = async ({ name, image }) => {
    const data = new FormData();
    data.append("name", name);
    data.append("folderId", selectedFolder._id);
    data.append("image", image);
    await api.post("/api/images", data);
    await loadFolders();
    await loadImages(selectedFolder._id);
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-shell">
        <header className="dashboard-header">
          <div>
            <h1 className="dashboard-title">Image Folder Manager</h1>
            <p className="dashboard-subtitle">Welcome back, {user?.name || "User"}</p>
          </div>
          <button onClick={logout} className="btn btn-secondary">
            <LogOut size={16} /> Logout
          </button>
        </header>

        <main className="dashboard-grid">
          <aside className="panel">
            <form onSubmit={createFolder} className="folder-form">
              <label className="form-label">Create New Folder</label>
              <input
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                placeholder={selectedFolder ? `Inside ${selectedFolder.name}` : "Root folder name"}
                className="text-input"
              />
              <button className="btn btn-primary btn-full">
                <Plus size={15} /> Add Folder
              </button>
            </form>
            <FolderTree folders={folders} selectedFolderId={selectedFolder?._id} onSelect={setSelectedFolder} />
          </aside>

          <section className="panel">
            <div className="section-header">
              <div>
                <h2 className="section-title">{selectedFolder?.name || "Select a folder"}</h2>
                <p className="section-meta">
                  {selectedFolder ? `Total size: ${Math.round((selectedFolder.totalSize / (1024 * 1024)) * 100) / 100} MB` : "No folder selected"}
                </p>
              </div>
              <button
                disabled={!selectedFolder}
                onClick={() => setUploadOpen(true)}
                className="btn btn-accent"
              >
                <ImagePlus size={16} /> Upload Image
              </button>
            </div>

            {!selectedFolder ? (
              <p className="empty-state">Choose a folder from the left panel.</p>
            ) : images.length === 0 ? (
              <p className="empty-state">No images in this folder yet.</p>
            ) : (
              <div className="images-grid">
                {images.map((image) => (
                  <article key={image._id} className="image-card">
                    <img src={image.imageUrl || `/${image.filePath}`} alt={image.name} className="image-preview" />
                    <div className="image-content">
                      <p className="image-name">{image.name}</p>
                      <p className="image-size">{(image.size / 1024).toFixed(1)} KB</p>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>

      <UploadModal
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        onSubmit={handleUpload}
        selectedFolder={selectedFolder}
      />
    </div>
  );
};

export default DashboardPage;
