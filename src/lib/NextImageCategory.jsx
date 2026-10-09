import React from "react";

export default function CustomImage({
  src,
  alt = "",
  className = "",
  loading = "lazy",
  ...props
}) {
  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      className={className}
      {...props}
    />
  );
}