'use client'
import Image from "next/image";
import React, { useState } from "react";

const ImageZoom = ({ imageUrl }: { imageUrl: string }) => {
  const [pos, setPos] = useState({ x: 0, y: 0, scale: 1 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();

    const x = (clientX - left) / width;
    const y = (clientY - top) / height;

    setPos({ 
      x: (0.5 - x) * 300,
      y: (0.5 - y) * 300,
      scale: 2
    });
  };

  const onMouseLeave = () => {
    setPos({ x: 0, y: 0, scale: 1 });
  };

  return (
    <div
      className="zoom-container"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        position: "absolute",
        overflow: "hidden",
        width: "100%",
        height: "100%",
      }}
    >
      <Image
      fill
      alt="dsd"
        src={imageUrl}
        style={{
          width: "100%",
          height: "100%",
          objectFit:"cover",
          inset: "0px",
          transform: `scale(${pos.scale}) translate(${pos.x}px, ${pos.y}px)`,
          transformOrigin: "center center",
          transition: "transform 0.2s ease",
        }}
      />
    </div>
  );
};

export default ImageZoom;
