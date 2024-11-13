import { BlobServiceClient } from "@azure/storage-blob";

const UploadPhoto = () => {
  const blobServiceClient = new BlobServiceClient(
    "https://inststorage123.blob.core.windows.net",
    new Azure.Storage.BlobSASCredential("<sas-token>")
  );

  const uploadFile = async (file) => {
    try {
      const containerClient = blobServiceClient.getContainerClient("photos");
      await containerClient.createIfNotExists();
      const blobClient = containerClient.getBlockBlobClient(file.name);
      await blobClient.uploadData(file);

      alert("Файл успішно завантажено!");
    } catch (error) {
      console.error("Помилка завантаження:", error);
      alert("Не вдалося завантажити файл.");
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      uploadFile(file);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
    </div>
  );
};

export default UploadPhoto;
