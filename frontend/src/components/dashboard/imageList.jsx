import React, { useState, useEffect } from "react";
import { GetImageList } from "../../api/Api";

const ImageList = () => {
  console.log("ImageList component rendered");
  const [images, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetImageList();
        console.log("inside imagelist", response);
        setData(response);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Image List</h2>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Image ID</th>
            <th>Image Name</th>
            <th>Image File</th>
          </tr>
        </thead>
        <tbody>
          {images.map((img, idx) => (
            <tr key={idx}>
              <td>{img._id}</td>
              <td>{img.filename}</td>
              <td>
                <img
                  src={`data:image/png;base64,${img.imageFile}`}
                  alt={img.filename}
                  height={200}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ImageList;
