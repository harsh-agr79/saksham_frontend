'use client';

import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';
// import { useToast } from '@/components/ui/toast';

const Domains = ({ studentData, onUpdate }) => {
  const { token, userType } = useSelector((state) => state.auth);
  const [domains, setDomains] = useState(studentData.domains || []);
//   const { toast } = useToast();

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/${userType}/domains/update`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ domains }),
        }
      );

      if (!response.ok) throw new Error('Failed to update domains.');

      const updatedData = await response.json();
      onUpdate(updatedData);
    //   toast({ description: 'Domains updated successfully.' });
    } catch (error) {
    //   toast({ description: error.message, variant: 'destructive' });
    }
  };

  const toggleDomain = (domain) => {
    if (domains.includes(domain)) {
      setDomains(domains.filter((d) => d !== domain));
    } else if (domains.length < 5) {
      setDomains([...domains, domain]);
    }
  };

  return (
    <div className="w-full mx-auto p-6">
      <div className="bg-purple-100 shadow-md rounded-lg p-6 space-y-6 border">
    <div>
      <h2 className="text-lg font-semibold">Interested Domains</h2>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Select Domains</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Select up to 5 domains:</DropdownMenuLabel>
          {['Technology', 'Healthcare', 'Finance', 'Education', 'Engineering'].map((domain) => (
            <DropdownMenuCheckboxItem
              key={domain}
              checked={domains.includes(domain)}
              onCheckedChange={() => toggleDomain(domain)}
            >
              {domain}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <Button onClick={handleUpdate}>Save</Button>
    </div>
    </div>
    </div>
  );
};

export default Domains;
