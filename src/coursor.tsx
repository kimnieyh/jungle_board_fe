"use client"
import React from "react";
import useMousePosition from "./useMousePosition";
const Cursor = () => {
    const { clientX, clientY } = useMousePosition();

    return (
        <div
            style={{
        position: "fixed",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
            pointerEvents: "none"
    }}
>
            <svg xmlns="http://www.w3.org/2000/svg" width={50} style={{
                position: "absolute",
                left: clientX,
                top: clientY,
                transform: "translate(-50%, -50%)",
            }}
                 height={50} viewBox="0 0 50 50" aria-hidden="true" role="img" className="iconify iconify--twemoji"
                 preserveAspectRatio="xMidYMid meet">
                <path fill="#1C6399"
                      d="M20.004 20.243c-.426 0-.858.01-1.294.031c-.436 1.268-.468 2.747 0 5.097c.328 1.646 2.659 6.299 4.584 7.933c.683.58 1.638.884 2.69.884c2.144 0 4.691-1.265 6.157-4.034c3.001-5.671-3.474-9.911-12.137-9.911z"/>
                <path fill="#1C6399"
                      d="M33.666 1.973c-.204 0-.425.021-.663.066c-3.182.601-9.302 5.126-14.287 11.771c0 0-.789 5.16-.789 6.194c0 .336 1.264.5 3.058.5c3.717 0 9.709-.705 11.424-2.041c1.898-1.479 3.65-9.804 3.488-14.079c-.046-1.175-.662-2.411-2.231-2.411z"/>
                <path fill="#55ACEE"
                      d="M27.098 13.936l6.629-.436s-1.055 3.619-3.102 4.656s-7.719 1.5-7.719 1.5s2.33-4.261 3.286-5.29c.237-.256.559-.408.906-.43zm.52-1.952l7.526-8.151s.002 5.365-1.206 8.635c0 0-5.383.379-5.914.391c-.703.016-.969-.265-.406-.875zm-6.068 7.672l5.5-8.547a.856.856 0 0 0 .171-.798l-.968-3.233l-6.722 6.609l-.844 6.031l2.863-.062zM27.862 8.88c.172.406.516.5.938.125s6.074-6.094 6-6.218c0 0-2.832-1.194-7.8 3.463c0 0 .69 2.224.862 2.63zm-8.925 12.099l5.373 5.228a.575.575 0 0 1 .125.709L22.06 31.25s-4.187-5.479-3.123-10.271zm7.282 6.301l5.549.741s-1.058 3.845-3.394 4.854c-3.906 1.688-5.312-.625-5.312-.625l2.352-4.562a.762.762 0 0 1 .805-.408zm-5.95-6.426l5.375 4.958c.077.066.169.11.269.129l6.119.903s-1.219-3.031-4.429-4.531c-3.71-1.733-7.334-1.459-7.334-1.459z"/>
                <path fill="#292F33"
                      d="M20.004 20.243c-.426 0-.858.01-1.294.031c-.436 1.268-.468 2.747 0 5.097c.328 1.646 2.659 6.299 4.584 7.933c.683.58 1.638.884 2.69.884c2.144 0 4.691-1.265 6.157-4.034c3.001-5.671-3.474-9.911-12.137-9.911zm10.537 9.326c-1.316 2.486-3.05 3.473-4.558 3.473c-.767 0-1.704-.313-2.15-.691c-1.695-1.439-3.437-4.58-4.25-7.224c-.465-1.513-.354-4.022-.354-4.022l.667-.021c5.168 0 9.249 2.058 10.726 4.512c.714 1.186.687 2.523-.081 3.973z"/>
                <path fill="#292F33"
                      d="M33.666 3.223c.231 0 .935 0 .981 1.208c.102 2.681-.594 6.061-1.397 8.882c-.541 1.901-1.586 3.292-2.094 3.687c-.56.436-1.863 1.238-3.719 1.563c-2.03.355-4.207.833-6.456.833c-.827 0-1.433.019-1.794-.021c.131-1.218.489-3.551.717-5.064c3.768-4.94 9.711-10.361 13.331-11.044c.155-.029.3-.044.431-.044m0-1.25c-.204 0-.425.021-.663.066c-3.182.601-9.302 5.126-14.287 11.771c0 0-.789 5.16-.789 6.194c0 .336 1.264.5 3.058.5c3.717 0 9.709-.705 11.424-2.041c1.898-1.479 3.65-9.804 3.488-14.079c-.046-1.175-.662-2.411-2.231-2.411z"/>
                <path fill="#1C6399"
                      d="M3.902 30.154c1.466 2.769 4.012 4.034 6.157 4.034c1.052 0 2.007-.304 2.69-.884c1.925-1.633 4.256-6.286 4.584-7.933c.468-2.35.436-3.828 0-5.097a26.911 26.911 0 0 0-1.294-.031c-8.665 0-15.139 4.24-12.137 9.911z"/>
                <path fill="#1C6399"
                      d="M2.376 1.973C.807 1.973.19 3.209.146 4.383c-.162 4.275 1.59 12.601 3.488 14.079c1.715 1.336 7.706 2.041 11.424 2.041c1.794 0 3.058-.164 3.058-.5c0-1.033-.789-6.194-.789-6.194C12.341 7.165 6.22 2.64 3.039 2.039a3.575 3.575 0 0 0-.663-.066z"/>
                <path fill="#55ACEE"
                      d="M8.943 13.936L2.315 13.5s1.055 3.619 3.102 4.656s7.719 1.5 7.719 1.5s-2.33-4.261-3.286-5.29a1.345 1.345 0 0 0-.907-.43zm-.519-1.952L.898 3.833s-.002 5.365 1.206 8.635c0 0 5.383.379 5.914.391c.703.016.969-.265.406-.875zm6.068 7.672l-5.5-8.547a.856.856 0 0 1-.171-.798l.968-3.233l6.722 6.609l.844 6.031l-2.863-.062zM8.179 8.88c-.172.406-.516.5-.938.125s-6.074-6.094-6-6.218c0 0 2.832-1.194 7.8 3.463c.001 0-.69 2.224-.862 2.63zm8.926 12.099l-5.373 5.228a.575.575 0 0 0-.125.709l2.375 4.333c-.001.001 4.187-5.478 3.123-10.27zM9.822 27.28l-5.549.741s1.058 3.845 3.394 4.854c3.906 1.688 5.312-.625 5.312-.625l-2.352-4.562a.76.76 0 0 0-.805-.408zm5.951-6.426l-5.375 4.958a.577.577 0 0 1-.269.129l-6.119.903s1.219-3.031 4.429-4.531c3.709-1.733 7.334-1.459 7.334-1.459z"/>
                <path fill="#292F33"
                      d="M3.902 30.154c1.466 2.769 4.012 4.034 6.157 4.034c1.052 0 2.007-.304 2.69-.884c1.925-1.633 4.256-6.286 4.584-7.933c.468-2.35.436-3.828 0-5.097a26.911 26.911 0 0 0-1.294-.031c-8.665 0-15.139 4.24-12.137 9.911zm1.518-4.559c1.477-2.454 5.558-4.512 10.726-4.512l.667.021s.111 2.51-.354 4.022c-.813 2.644-2.555 5.785-4.25 7.224c-.446.379-1.383.691-2.15.691c-1.508 0-3.242-.986-4.558-3.473c-.768-1.449-.795-2.786-.081-3.973z"/>
                <path fill="#292F33"
                      d="M2.376 3.223c.131 0 .276.015.431.044c3.619.683 9.563 6.104 13.331 11.044c.228 1.513.586 3.846.717 5.064c-.361.04-.967.021-1.794.021c-2.249 0-4.426-.478-6.456-.833c-1.856-.325-3.159-1.127-3.719-1.563c-.508-.396-1.553-1.786-2.094-3.687c-.803-2.821-1.499-6.201-1.397-8.882c.046-1.208.749-1.208.981-1.208m0-1.25C.807 1.973.19 3.209.146 4.383c-.162 4.275 1.59 12.601 3.488 14.079c1.715 1.336 7.706 2.041 11.424 2.041c1.794 0 3.058-.164 3.058-.5c0-1.033-.789-6.194-.789-6.194C12.341 7.165 6.22 2.64 3.039 2.039a3.575 3.575 0 0 0-.663-.066z"/>
                <path fill="#292F33"
                      d="M21.887 4.762a.515.515 0 0 0-.701.203l-2.74 4.98c-.018.033-.022.068-.032.102c-.127-.007-.244-.018-.393-.018c-.148 0-.266.01-.392.018c-.01-.034-.014-.069-.032-.102l-2.74-4.98a.516.516 0 0 0-.905.498l2.655 4.826c-1.179.784 1.15 3.438.381 9.204c-1.033 7.75 1.033 9.817 1.033 9.817s2.067-2.067 1.033-9.817c-.769-5.766 1.56-8.42.381-9.204l2.656-4.826a.516.516 0 0 0-.204-.701z"/>
            </svg>

        </div>
);
};

export default Cursor;