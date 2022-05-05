import { useEffect, useRef, useState } from "react";
import style from "./link.module.css";

export default function Link({ docId, title, url, onDelete, onUpdate }) {
  const [currentTitle, setCurrentTitle] = useState(title);
  const [currentUrl, setCurrentUrl] = useState(url);
  const [editTitle, setEditTitle] = useState(false);
  const [editUrl, setEditUrl] = useState(false);

  const titleRef = useRef(null);
  const urlRef = useRef(null);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.focus();
    }
  }, [editTitle]);

  useEffect(() => {
    if (urlRef.current) {
      urlRef.current.focus();
    }
  }, [editUrl]);

  function handlEditTitle() {
    setEditTitle(true);
  }

  function handlEditUrl() {
    setEditUrl(true);
  }
  function handleChangeTitle(e) {
    setCurrentTitle(e.target.value);
  }

  function handlChangeUrl(e) {
    setCurrentUrl(e.target.value);
  }

  function handleBlurTitle(e) {
    setEditTitle(false);
    onUpdate(docId, currentTitle, currentUrl);
  }

  function handleBlurUrl(e) {
    setEditUrl(false);
    onUpdate(docId, currentTitle, currentUrl);
  }

  function handleDelete() {
    onDelete(docId);
  }

  return (
    <div className={style.link} key={docId}>
      <div className={style.linkInfo}>
        <div className={style.linkTitle}>
          {editTitle ? (
            <input
              ref={titleRef}
              value={currentTitle}
              onChange={handleChangeTitle}
              onBlur={handleBlurTitle}
            />
          ) : (
            <div>
              <button className={style.btnEdit} onClick={handlEditTitle}>
                <span className="material-icons"> edit </span>
              </button>
              {currentTitle}
            </div>
          )}
        </div>
      </div>
      <div className={style.linkUlr}>
      {editUrl ? (
        <input
          ref={urlRef}
          value={currentUrl}
          onChange={handlChangeUrl}
          onBlur={handleBlurUrl}
        />
      ) : (
        <div>
          <button onClick={handlEditUrl}>
            <span className="material-icons"> edit </span>
          </button>
          {currentUrl}
        </div>
      )}
      </div>
      <div className={style.linkActions}>
        <button className={style.btnDelete} onClick={handleDelete}>     
          <span className="material-icons"> delete </span>
        </button>
      </div>
    </div>
  );
}
