// import { useRouter } from 'next/router';
// import { useState } from 'react';

// const ChildComponent = ({ sendDataToParent }:{sendDataToParent:any}) => {
//   const [dataToSend, setDataToSend] = useState('');
//   const router=useRouter();

//   const sendDataToParentOnClick = () => {
//     sendDataToParent=dataToSend;
//     router.push("/sample/page1")
//   };

//   return (
//     <div>
//       <h2>Child Component</h2>
//       <input
//         type="text"
//         value={dataToSend}
//         onChange={(e) => setDataToSend(e.target.value)}
//       />
//       <button onClick={sendDataToParentOnClick}>Send Data to Parent</button>
//     </div>
//   );
// };

// export default ChildComponent;
