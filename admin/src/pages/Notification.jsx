import React, { useEffect, useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
const Notification = () => {
  const [otps, setOtps] = useState(() => {
    const savedOtps = localStorage.getItem('otps');
    return savedOtps ? JSON.parse(savedOtps) : [];
  });

  useEffect(() => {
    const source = new EventSource('http://139.59.58.151:8000/otp-updates');

    source.onmessage = function (event) {
      const data = JSON.parse(event.data);
      setOtps(prevOtps => {
        const updatedOtps = [...prevOtps, data.otp];
        localStorage.setItem('otps', JSON.stringify(updatedOtps));
        return updatedOtps;
      });
    };
    console.log("otp", otps);
    source.onerror = function (error) {
      console.error('EventSource failed:', error);
      // You can add logic here to handle errors, such as reconnecting or showing an error message
    };

    // Cleanup function to close the EventSource connection when the component unmounts
    return () => {
      source.close();
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <div className='container mt-5 pt-5'>
      <div className="pt-3"><h3 className="text-dark text-center mt-4">Notification</h3>
        <hr /></div>
      <ListGroup as="ol" numbered>
        <div className='row '>
          {otps.reverse().map((otp, index) => {
            return (
              <ListGroup.Item
                as="li"
                className="d-flex  align-items-start" >
                <div className=" me-auto "><span class="material-symbols-outlined">
                  news
                </span>
                  <div key={index}><h6>Name:{otp.name}</h6>
                    <h6>Role:{otp.role}</h6>
                    <p>UserId: <b>{otp.userId}</b><br />
                      Received OTP: <b>{otp.password}</b></p>
                    <p>Device Info:
                      SystemName: {otp.device_info && otp.device_info.systemName}<br />SystemVersion: {otp.device_info && otp.device_info.systemVersion}<br />AppName: {otp.device_info && otp.device_info.appName}<br />Brand: {otp.device_info && otp.device_info.brand}<br /></p>
                  </div>
                </div>
              </ListGroup.Item>
            )
          })}
        </div>
      </ListGroup>
    </div>
  );
};

export default Notification;