export const useMicrophoneAnalyzer = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

  const context = new AudioContext();
  const source = context.createMediaStreamSource(stream);

  const analyzer = new AnalyserNode(context);
  source.connect(analyzer);

  return {
    source,
    analyzer,
    stopMicrophone: () => {
      stream.getTracks().forEach((track) => {
        track.stop();
      });
    },
  };
};
