import React, { useState } from "react";
import path from "path";
import { toast } from "react-toastify";
import { UploadIcon } from "./Icons";
import UploadArticleModal from "./UploadArticleModal";
import { upload } from "../utils";

const UploadArticle = () => {
  const [showModal, setShowModal] = useState(false);
  const [previewArticle, setPreviewArticle] = useState("");
  const closeModal = () => setShowModal(false);

  const [url, setUrl] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const handleArticleUpload = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const size = file.size / 1000000;

      if (size > 30) {
        return toast.error("Sorry, file size should be less than 30MB");
      }

      const url = URL.createObjectURL(file);
      setPreviewArticle(url);
      setShowModal(true);

      const data = await upload("article", file);
      setUrl(data);

      const ext = path.extname(data);
      setThumbnail(data.replace(ext, ".jpg"));
    }
  };

  return (
    <div>
      <label htmlFor="article-upload">
        <UploadIcon />
      </label>
      <input
        style={{ display: "none" }}
        id="article-upload"
        type="file"
        accept="article/*"
        onChange={handleArticleUpload}
      />
      {showModal && (
        <UploadArticleModal
          closeModal={closeModal}
          previewArticle={previewArticle}
          thumbnail={thumbnail}
          url={url}
        />
      )}
    </div>
  );
};

export default UploadArticle;
