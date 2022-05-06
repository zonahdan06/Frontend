import "../css/B1Q1.css";
import Q12 from "./sounds/B1Q12.mp3";
import { useState, useEffect } from "react";
import { useSpeechRecognition } from "react-speech-kit";
import { useNavigate } from "react-router-dom";
const B1Q12 = () => {
  const navigate = useNavigate();
  const useAudio = url => {
    const [audio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(false);

    const toggle = () => setPlaying(!playing);

    useEffect(() => {
      playing ? audio.play() : audio.pause();
    }, [playing]);

    useEffect(() => {
      audio.addEventListener("ended", () => setPlaying(false));
      return () => {
        audio.removeEventListener("ended", () => setPlaying(false));
      };
    }, []);

    return [audio, playing, toggle];
  };
  const [audio, playing, toggle] = useAudio(Q12);
  const [value, setValue] = useState("");
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: result => {
      // 음성인식 결과가 value 상태값으로 할당됩니다.
      setValue(result);
    }
  });
  useEffect(() => {
    toggle();
  }, []);
  useEffect(() => {
    console.log(playing);
    if (!playing) {
      listen({ interimResults: false });
    }
  }, [playing]);
  useEffect(() => {
    if (value.includes("빵빵")) {
      console.log("빵빵");
    } else if (value.includes("콩콩")) {
      console.log("콩콩");
    } else {
    }
  }, [value]);
  return (
    <div className="B1Q1">
      <div>
        <div
          className="quit"
          onClick={() => {
            audio.pause();
            navigate("/Save", { state: { page: "B1Q12" } });
          }}
        >
          <img
            className="quit_img"
            alt="quit"
            src={require("../img/quit.png")}
          />
        </div>
        <div className="exp">노래를 불러요!</div>
        <div className="Content">
          <p>
            비가 온다면 거북이가 더욱 힘을 내서 경주를 할 수 있을거예요. <br />
            노래를 부르면 비가 올 수도 있어요! <br />
            <br />
            아래와 같이 말해보세요!
          </p>
          <div className="paint3">
            <img
              className="img"
              alt="book"
              src={require("../img/rabbit.png")}
            />
            <div className="text_r">노래를 부르려면 "빵빵"</div>
          </div>
          <div className="paint2">
            <img
              className="img"
              alt="book"
              src={require("../img/turtle.png")}
            />
            <div className="text_t">부르지 않으려면 "콩콩"</div>
          </div>
          <div>
            <img
              className="micro"
              alt="micro"
              src={require("../img/micro.png")}
            />
          </div>
          <div className="answer">{value}</div>

          {listening && <div>음성인식 활성화 중</div>}
        </div>
      </div>
    </div>
  );
};
export default B1Q12;
