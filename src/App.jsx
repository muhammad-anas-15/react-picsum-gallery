import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [userData, setUserData] = useState([]);
  const [index, setIndex] = useState(1); // ✅ FIX: added page index

  const getData = async () => {
    const response = await axios.get(
      `https://picsum.photos/v2/list?page=${index}&limit=15`
    );

    setUserData(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    getData();
  }, [index]); // re-run API when page changes

  return (
    <div className="bg-black min-h-screen text-white p-4 overflow-auto">

      <div className="flex flex-wrap gap-4 mt-5">
        {userData.length === 0
          ? "No User Available"
          : userData.map((elem, idx) => (
              <div key={idx} className="h-48 w-44">
                <img
                  src={`https://picsum.photos/id/${elem.id}/300/200`} // resized
                  alt=""
                  className="w-44 h-28 object-cover rounded-md"
                />
                <h2 className="font-bold text-lg mt-2">{elem.author}</h2>
              </div>
            ))}
      </div>

      {/* PAGINATION BUTTONS */}
      <div className="mt-6 flex gap-4 px-90">
        <button
          onClick={() => index > 1 && setIndex(index - 1)}
          className="bg-yellow-400 text-white px-4 py-2 rounded disabled:opacity-30"
          disabled={index === 1}
        >
          Prev
        </button>

        <button
          onClick={() => setIndex(index + 1)}
          className="bg-yellow-400 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
