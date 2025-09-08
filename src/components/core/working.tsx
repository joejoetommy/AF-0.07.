'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { RadioGroup } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/solid'
import { Icon } from '@iconify/react'

const mailingLists = [
  { id: 1, title: 'About', description: 'Learn more about us', href: '/about', icon: 'pepicons-pencil:cv-circle-filled' },
  { id: 2, title: 'Apply', description: 'Start your application', href: '/apply', icon: 'streamline-ultimate:human-resources-businessman-bold' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function MailingListChooser() {
  const [selectedMailingList, setSelectedMailingList] = useState(null)
  const router = useRouter()

  return (
    <div className="w-full">
      <RadioGroup
        value={selectedMailingList}
        onChange={(val) => {
          setSelectedMailingList(val)
          if (val?.href) router.push(val.href)
        }}
      >
        <RadioGroup.Label className="text-base font-medium text-zinc-900 dark:text-zinc-100">
          Select a mailing list
        </RadioGroup.Label>

        <div className="mt-4 grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-4">
          {mailingLists.map((mailingList) => (
            <RadioGroup.Option
              key={mailingList.id}
              value={mailingList}
              className={({ checked, active }) =>
                classNames(
                  checked
                    ? 'border-transparent bg-zinc-50 dark:bg-zinc-900'
                    : 'border-green-600',
                  active ? 'ring-2 ring-green-600 border-green-600' : '',
                  'relative bg-zinc-100 dark:bg-zinc-950 border-2 rounded-2xl shadow-lg p-4 flex items-center justify-between cursor-pointer focus:outline-none transition'
                )
              }
            >
              {({ checked, active }) => (
                <>
                  <div className="flex flex-col">
                    <RadioGroup.Label as="span" className="block text-lg font-bold text-zinc-900 dark:text-zinc-100">
                      {mailingList.title}
                    </RadioGroup.Label>
                    <RadioGroup.Description as="span" className="mt-1 block text-sm text-zinc-600 dark:text-zinc-400">
                      {mailingList.description}
                    </RadioGroup.Description>
                  </div>

                  {/* Icon aligned right */}
                  <Icon icon={mailingList.icon} width="28" height="28" className="text-green-600 ml-3 shrink-0" />

                  {/* Selected check indicator */}
                  <CheckCircleIcon
                    className={classNames(!checked ? 'invisible' : '', 'h-5 w-5 text-green-600 absolute top-2 right-2')}
                    aria-hidden="true"
                  />
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  )
}
