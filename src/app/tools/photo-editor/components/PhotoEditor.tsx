"use client";

import React, { useEffect, useRef } from "react";
import TuiImageEditor from "tui-image-editor";
import { Button } from "@/components/ui/button";
import "tui-image-editor/dist/tui-image-editor.css";

const theme = {
  "common.bi.image": "none",
  "common.bisize.width": "0",
  "common.bisize.height": "0",
  "common.backgroundColor": "#1f2937",
  "common.border": "0px",

  "header.backgroundImage": "none",
  "header.backgroundColor": "transparent",
  "header.border": "0px",

  "menu.normalIcon.color": "#8a8a8a",
  "menu.activeIcon.color": "#555555",
  "menu.disabledIcon.color": "#434343",
  "menu.hoverIcon.color": "#e9e9e9",
  "menu.iconSize.width": "24px",
  "menu.iconSize.height": "24px",

  "submenu.normalIcon.color": "#8a8a8a",
  "submenu.activeIcon.color": "#e9e9e9",
  "submenu.iconSize.width": "32px",
  "submenu.iconSize.height": "32px",

  "checkbox.border": "1px solid #ccc",
  "checkbox.backgroundColor": "#fff",

  "frame.tintColor": "#222",
  "frame.secondaryTintColor": "#222",
  "frame.backgroundColor": "transparent",

  "menu.backgroundColor": "#1f2937",
  "menu.normalIcon.path": "",
  "menu.normalIcon.name": "icon-d",
  "menu.activeIcon.path": "",
  "menu.activeIcon.name": "icon-b",

  "submenu.backgroundColor": "#1f2937",
  "submenu.partition.color": "#3f3f3f",

  "submenu.normalLabel.color": "#8a8a8a",
  "submenu.activeLabel.color": "#fff",

  "filter.backgroundColor": "#1f2937",
  "filter.icon.color": "#8a8a8a",
  "filter.icon.activeColor": "#fff",

  "range.pointer.color": "#fff",
  "range.bar.color": "#666",
  "range.subbar.color": "#d1d1d1",

  "draw.drawingMode.menu.color": "#8a8a8a",
  "draw.drawingMode.menu.activeColor": "#fff",
};

interface PhotoEditorProps {
  imageUrl: string;
  onSave: (editedImageUrl: string) => void;
  onClose: () => void;
}

const PhotoEditor: React.FC<PhotoEditorProps> = ({
  imageUrl,
  onSave,
  onClose,
}) => {
  const editorRef = useRef<TuiImageEditor | null>(null);

  useEffect(() => {
    const container = document.getElementById("tui-image-editor");
    if (!container) return;

    container.style.height = "700px";

    if (!editorRef.current) {
      editorRef.current = new TuiImageEditor(container, {
        includeUI: {
          loadImage: {
            path: imageUrl,
            name: "SampleImage",
          },
          theme,
          menu: [
            "crop",
            "flip",
            "rotate",
            "draw",
            "shape",
            "icon",
            "text",
            "mask",
            "filter",
          ],
          initMenu: "",
          uiSize: {
            width: "100%",
            height: "700px",
          },
          menuBarPosition: "bottom",
        },
        cssMaxWidth: 1000,
        cssMaxHeight: 700,
        selectionStyle: {
          cornerSize: 20,
          rotatingPointOffset: 70,
        },
        usageStatistics: false,
      });

      const downloadBtn = container.querySelector(
        ".tui-image-editor-download-btn"
      );
      if (downloadBtn) {
        downloadBtn.addEventListener("click", handleDownload);
      }
    } else {
      editorRef.current.loadImageFromURL(imageUrl, "SampleImage");
    }

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, [imageUrl]);

  const handleSave = () => {
    if (editorRef.current) {
      const editedImageUrl = editorRef.current.toDataURL();
      onSave(editedImageUrl);
    }
  };

  const handleDownload = () => {
    if (editorRef.current) {
      const dataURL = editorRef.current.toDataURL();
      const link = document.createElement("a");
      link.download = "edited-image.png";
      link.href = dataURL;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="relative">
      <div className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div id="tui-image-editor" className="w-full" />
      </div>
      <div className="absolute bottom-4 right-4 flex space-x-2">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSave}>Save Changes</Button>
        <Button variant="secondary" onClick={handleDownload}>
          Download
        </Button>
      </div>
    </div>
  );
};

export default PhotoEditor;
