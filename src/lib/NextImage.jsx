import React from "react";

export default function NextImage({
  src,
  alt = "",
  fill = false,
  width,
  height,
  priority,
  style,
  ...props
}) {
  const mergedStyle = fill
    ? {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        ...style,
      }
    : style;

  return (
    <img
      src={src}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      loading={priority ? "eager" : props.loading}
      style={mergedStyle}
      {...props}
    />
  );
}
