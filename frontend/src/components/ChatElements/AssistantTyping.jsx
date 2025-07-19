function AssistantTyping() {
  return (
    <div className="flex justify-start">
      <div className="bg-gray-700 text-white px-4 py-2 rounded-lg rounded-bl-none max-w-[60%] shadow-md">
        <div className="flex space-x-1">
          <span className="animate-bounce [animation-delay:0ms]">.</span>
          <span className="animate-bounce [animation-delay:150ms]">.</span>
          <span className="animate-bounce [animation-delay:300ms]">.</span>
        </div>
      </div>
    </div>
  );
}

export default AssistantTyping;
