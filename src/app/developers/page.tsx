'use client';
import useFetch from '@/hooks/useFetch';
import { User } from '@/interface/User';
import React from 'react';
import { TiTick } from 'react-icons/ti';
import Link  from 'next/link';

function page() {
  const { data, loading, error, Profiles } = useFetch<User[] | undefined>('profile');
  console.log(
    Profiles,
  );
  return (
    <div className="px-16">
    <h1 className="font-bold text-[50px] leading-[60px] text-[#0f3352] pt-8">
      Developers
    </h1>
    <h2 className="text-[#343a40] text-lg pt-3">
      Browse and connect with developers
    </h2>

    <div className="my-6">
      {Profiles?.length  ? (
        <ul className="space-y-4">
          {data?.map((developer) => (
            <li
              key={developer._id}
              className="p-4 pr-20 border rounded-md shadow-sm bg-white flex justify-between"
            >
              <div className="flex gap-10">
                <div className="py-6">
                  <img
                    src={developer.user.avatar}
                    alt={developer.user.name}
                    className="w-[150px] rounded-full"
                  />
                </div>

                <div className="py-6 flex flex-col gap-3">
                  <h3 className="font-bold text-2xl">
                    {developer.user.name}
                  </h3>
                  <p className="text-lg">
                    {developer.status}{" "}
                    {developer.company && `at ${developer.company}`}
                  </p>
                  {developer.location && (
                    <i className="text-lg">{developer.location}</i>
                  )}
                  <button className="w-[140px] py-2 bg-[#0f3352] text-white rounded-md ">
                    <Link href={`/profile/${developer.user._id}`}>
                      View Profile
                    </Link>
                  </button>
                </div>
              </div>
              <div className="py-6">
                {developer.skills.map((skill:any, index:any) => (
                  <p
                    key={index}
                    className="text-[#17a2b8] text-lg flex items-center gap-3"
                  >
                    <TiTick size={"25px"} />
                    {skill}
                  </p>
                ))}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No developers found.</p>
      )}
    </div>
  </div>

  );
}

export default page;
