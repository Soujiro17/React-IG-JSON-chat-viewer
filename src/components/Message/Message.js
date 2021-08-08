import React, { useState } from "react";
import "./index.scss";
import { utf8_decode } from "locutus/php/xml";
import { DateTime } from "luxon";

const Message = ({ message, time, type, author }) => {
  const [visibility, setVisibility] = useState(false);

  const styleMessage = {
    display: "flex",
    justifyContent: "flex-end",
  };

  const styleReceived = {
    marginLeft: "0",
    marginRight: "15px",
    background: "#eee",
  };

  const errorFile = {
    fontWeight: "bold",
  };

  const whatKindIs = () => {
    if (type === "Generic") {
      if (message.content) return <p>{utf8_decode(message.content)}</p>;
      else if (message.photos)
        return <p style={errorFile}>Foto no disponible</p>;
      else if (message.videos)
        return <p style={errorFile}>Video no disponible</p>;
      else if (message.audio_files)
        return <p style={errorFile}>Audio no disponible</p>;

      return false;
    }

    if (message.content) return <p>{message.content}</p>;
    else if (message.share)
      return (
        <a
          href={message.share.link}
          className="post-link"
          target="_blank"
          rel="noreferrer"
        >
          {message.share.link}
        </a>
      );

    return false;
  };

  return (
    <>
      {whatKindIs() ? (
        <div className="message-container" style={author ? styleMessage : null}>
          <div
            className="message-received"
            style={author ? styleReceived : null}
            onClick={() => setVisibility(!visibility)}
          >
            {whatKindIs()}
            <div
              className="time-ago"
              style={visibility ? { display: "block" } : { display: "none" }}
            >
              <p>{DateTime.fromSeconds(time / 1000).toRelative()}</p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Message;
