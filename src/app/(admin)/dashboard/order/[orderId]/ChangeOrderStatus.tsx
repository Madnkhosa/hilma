"use client";
import React from "react";

const ChangeOrderStatus = ({ status, orderid }: { status: string, orderid: string }) => {
  const handleStatusChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target.value;

    
    const isConfirmed = window.confirm("Are you sure you want to change the status?");
    if (!isConfirmed) {
      return; 
    }

    const formData = new FormData();
    formData.append('status', newStatus);

    try {
      const response = await fetch(`/api/order/${orderid}`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        window.location.reload()
      }
    
      console.log('Status updated successfully');
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <td className="px-6 py-4 text-[16px] font-[700] text-[#0E0E0E]">
      {status === "pending" ? (
        <select className="form-select mt-1 block w-[70%]" onChange={handleStatusChange} defaultValue="pending">
          <option value="pending">pending</option>
          <option value="approved">approved</option>
        </select>
      ) : (
        status
      )}
    </td>
  );
};

export default ChangeOrderStatus;
