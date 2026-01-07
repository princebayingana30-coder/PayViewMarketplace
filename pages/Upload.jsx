import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import { useState } from "react";

export default function Upload() {
  const [file, setFile] = useState(null);

  const uploadFile = async () => {
    if (!file) return alert("Select a file first");

    const fileRef = ref(storage, `uploads/${Date.now()}_${file.name}`);
    await uploadBytes(fileRef, file);

    const url = await getDownloadURL(fileRef);
    alert("Upload successful");
    console.log("File URL:", url);
  };

  return (
    <div>
      <h2>Upload Image / Video</h2>
      <input
        type="file"
        accept="image/*,video/*"
        onChange={e => setFile(e.target.files[0])}
      />
      <button onClick={uploadFile}>Upload</button>
    </div>
  );
}
