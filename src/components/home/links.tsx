"use client";
//   import { CheckCircleIcon } from '@heroicons/react/solid'

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { Icon } from "@iconify/react";

type MailingList = {
  id: number;
  title: string;
  description: string;
  href: string;
  icon: string; // iconify icon name
};

const mailingLists: ReadonlyArray<MailingList> = [
  {
    id: 1,
    title: "Candidate",
    description: "Apply as a candidate with us",
    href: "/candidate",
    icon: "pepicons-pencil:cv-circle-filled",
  },
  {
    id: 2,
    title: "Client",
    description: "Start your application as a Client",
    href: "/client",
    icon: "streamline-ultimate:human-resources-businessman-bold",
  },
];

/** Safe class joiner */
function classNames(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

export default function MailingListChooser() {
  // store just the selected id (or null)
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const router = useRouter();

  // quick lookup by id
  const byId = useMemo(() => {
    const map = new Map<number, MailingList>();
    for (const item of mailingLists) map.set(item.id, item);
    return map;
  }, []);

  return (
    <div className="w-full">
      <RadioGroup
        value={selectedId}
        onChange={(id: number) => {
          setSelectedId(id);
          const item = byId.get(id);
          if (item) router.push(item.href);
        }}
      >
        <div className="mt-4 grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-4">
          {mailingLists.map((mailingList) => (
            <RadioGroup.Option
              key={mailingList.id}
              value={mailingList.id}
              className={({ checked, active }) =>
                classNames(
                  checked
                    ? "border-transparent bg-zinc-50 dark:bg-zinc-900"
                    : "border-green-600",
                  active ? "ring-2 ring-green-600 border-green-600" : "",
                  "relative bg-zinc-100 dark:bg-zinc-950 border-2 rounded-2xl shadow-lg p-4 flex items-center justify-between cursor-pointer focus:outline-none transition"
                )
              }
            >
              {({ checked }) => (
                <>
                  <div className="flex-1">
                    <RadioGroup.Label
                      as="span"
                      className="block text-sm font-semibold text-zinc-900 dark:text-zinc-100"
                    >
                      {mailingList.title}
                    </RadioGroup.Label>
                    <RadioGroup.Description
                      as="span"
                      className="mt-1 block text-sm text-zinc-600 dark:text-zinc-400"
                    >
                      {mailingList.description}
                    </RadioGroup.Description>
                  </div>

                  {/* Icons aligned right */}
                  <div className="ml-3 flex shrink-0 items-center space-x-2">
                    <Icon
                      icon={mailingList.icon}
                      width="28"
                      height="28"
                      className="text-green-600"
                    />
                    <Icon
                      icon="rivet-icons:plus"
                      width="24"
                      height="24"
                      className="text-zinc-500 dark:text-zinc-400"
                    />
                  </div>

                  {/* Selected check indicator */}
                  <CheckCircleIcon
                    className={classNames(
                      !checked && "invisible",
                      "absolute right-2 top-2 h-5 w-5 text-green-600"
                    )}
                    aria-hidden="true"
                  />
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}