import 'react';

const AlertPopup = ({ onRebook, onRelease }) => {
  return (
    <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-white border shadow-xl rounded-xl p-6 z-50">
      <h3 className="text-lg font-bold mb-2">⏰ Booking Time Ended</h3>
      <p className="mb-4">Your booking has expired. What would you like to do?</p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2" onClick={onRebook}>🔁 Re-book</button>
      <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={onRelease}>🛑 Release</button>
    </div>
  );
};

export default AlertPopup;
