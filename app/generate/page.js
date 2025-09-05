'use client';

import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

const Generate = () => {
  const searchParams = useSearchParams();

  const [links, setLinks] = useState([{ link: "", linktext: "" }]);
  const [handle, setHandle] = useState(searchParams.get("handle") || "");
  const [pic, setPic] = useState("");
  const [desc, setDesc] = useState("");

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    setLinks((initialLinks) => {
      const newLinks = [...initialLinks];
      newLinks[index][name] = value;
      return newLinks;
    });
  };

  const addLink = () => {
    setLinks([...links, { link: "", linktext: "" }]);
  };

  const submitLinks = async () => {
    try {
      const res = await fetch("/api/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          links,
          handle,
          pic,
          desc,
        }),
      });

      const result = await res.json();

      if (result.success) {
        toast.success(result.message);
        setLinks([{ link: "", linktext: "" }]);
        setPic("");
        setHandle("");
        setDesc("");
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="bg-[#E9C0E9] min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left Column */}
      <div className="flex justify-center items-center flex-col text-gray-900 px-6 py-8">
        <div className="flex flex-col gap-5 w-full max-w-lg">
          <h1 className="font-bold text-3xl md:text-4xl text-center">
            Create your Bittree
          </h1>

          {/* Step 1 */}
          <div>
            <h2 className="font-semibold text-xl md:text-2xl">
              Step 1: Claim your Handle
            </h2>
            <input
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              className="px-4 py-2 my-2 w-full focus:outline-pink-500 bg-white rounded-full"
              type="text"
              placeholder="Choose a Handle"
            />
          </div>

          {/* Step 2 */}
          <div>
            <h2 className="font-semibold text-xl md:text-2xl">
              Step 2: Add Links
            </h2>
            {links.map((item, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-2 my-2">
                <input
                  name="linktext"
                  value={item.linktext || ""}
                  onChange={(e) => handleChange(index, e)}
                  className="px-4 py-2 flex-1 bg-white focus:outline-pink-500 rounded-full"
                  type="text"
                  placeholder="Enter link text"
                />
                <input
                  name="link"
                  value={item.link || ""}
                  onChange={(e) => handleChange(index, e)}
                  className="px-4 py-2 flex-1 bg-white focus:outline-pink-500 rounded-full"
                  type="text"
                  placeholder="Enter link"
                />
              </div>
            ))}
            <button
              onClick={addLink}
              className="p-2 px-5 mt-2 bg-slate-900 text-white font-bold rounded-3xl cursor-pointer"
            >
              + Add Link
            </button>
          </div>

          {/* Step 3 */}
          <div>
            <h2 className="font-semibold text-xl md:text-2xl">
              Step 3: Add Picture and Description
            </h2>
            <div className="flex flex-col gap-2">
              <input
                value={pic}
                onChange={(e) => setPic(e.target.value)}
                className="px-4 py-2 bg-white rounded-full"
                type="text"
                placeholder="Enter link to your Picture"
              />
              <input
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="px-4 py-2 bg-white rounded-full"
                type="text"
                placeholder="Enter description"
              />
              <button
                disabled={!pic || !handle || !links[0].linktext}
                onClick={submitLinks}
                className="disabled:bg-slate-500 cursor-pointer p-2 px-5 w-fit my-4 bg-slate-900 text-white font-bold rounded-3xl"
              >
                Create your Linktree
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="hidden md:flex w-full h-screen bg-[#E9C0E9]">
        <Image
          width={320}
          height={100}
          className="object-contain mx-auto"
          src="/generate.png"
          alt="Generate your links"
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Generate;
