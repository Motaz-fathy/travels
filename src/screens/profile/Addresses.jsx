import React, { useEffect, useState } from "react";
import MapAndAutoComplete from '../../sheard/MapAndAutoComplete';
import MapAndAutoEdit from '../../sheard/MapAndAutoEdit';
import { useSelector, useDispatch } from 'react-redux';
import { getAddressAction , deleteAddressAction } from '../../redux/actions/profile/profile_actions';
import { FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';
import {Popover} from '../../sheard/Popover'

export const Addresses = () => {
  const dispatch = useDispatch();
  const { addressList, loadingGet, errorGet } = useSelector(state => state.getAddressReducer);
  const { deleteMessage, loadingDelete, errorDelete } = useSelector(state => state.deleteAddressReducer);
  const loginReducer = useSelector(state => state.LoginReducer);
  let token = loginReducer.data.data.api_token || null;
  const [updateData , setUpdateData ] = useState({})
  const [openMap, setOpenMap] = useState(false);
  const [openEditMap, setOpenEditMap] = useState(false);

  const handleOpenMap = () => {
    setOpenMap(!openMap);
  };

  // handle delete address action 
  const handleDelete = async (id) => {
    await  dispatch(deleteAddressAction(token , id ))
    toast.success(deleteMessage)
  }
  
  // handle update address action 
  const handleUpdate = (item) => {
    setOpenEditMap(!openEditMap)
    setUpdateData(item)
  }
  

  useEffect(() => {
    if (token) {
      dispatch(getAddressAction(token));
    }
  }, [dispatch, token , openMap , openEditMap , deleteMessage]);

  useEffect(() => {
    if (errorGet) {
      toast.error(errorGet);
    }
  }, [errorGet]);



  return (
    <div className="w-full p-4">
      <button
        className="w-2/3 max-md:w-full mx-auto block h-10 px-4 bg-gray-800 rounded-md text-gray-200 mb-4"
        onClick={handleOpenMap}
      >
        {openMap ? <span>show address </span> : <span>add new address</span>}
      </button>
      {!openMap && (
        loadingGet ? (
          <div className="flex justify-center items-center h-40">
            <FaSpinner className="animate-spin text-4xl text-gray-800" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-2/3 mx-auto bg-white shadow-md rounded-lg overflow-hidden">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                    Address Details
                  </th>
                  <th className="px-6 py-3 bg-gray-200"></th>
                  <th className="px-6 py-3 bg-gray-200"></th>
                </tr>
              </thead>
              <tbody>
                {addressList?.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.map_location.address_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                      onClick={() => handleUpdate(item)}
                      className="px-4 py-2 bg-sky-600 text-gray-200 rounded-md flex justify-center items-center gap-2">
                        Edit
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium ">
                      <button 
                      className="px-4 flex justify-center items-center gap-2 py-2 bg-red-600 text-gray-200 rounded-md" 
                      onClick={() => handleDelete(item.id)}>
                      <span>Delete</span> {loadingDelete && <FaSpinner />}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
     
      <Popover className="custom-class" flag={openMap} onClose={handleOpenMap}>
         <MapAndAutoComplete   />
        <button onClick={() => setOpenMap(false)} className="px-4 py-1 rounded-lg bg-gray-800 text-gray-200 ">Close</button>
      </Popover>

      <Popover className="" flag={openEditMap} onClose={setOpenEditMap}>
         <MapAndAutoEdit updateData={updateData}/>
        <button onClick={() => setOpenEditMap(false)} className="px-4 py-1 rounded-lg bg-gray-800 text-gray-200 ">Close</button>
      </Popover>


    </div>
  );
};

