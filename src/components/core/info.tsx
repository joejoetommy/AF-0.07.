import { Icon } from '@iconify/react'

const features = [
  {
    name: 'Nation Wide',
    description: 'Recruitment company specialising in connecting farmers to permanent staff',
    icon: 'uiw:map', // was CloudUploadIcon
  },
  {
    name: 'Specialised in Dairy',
    description: ' Providing seamless recruitment solutions that simplify the hiring process',
    icon: 'fa7-solid:cow', // was LockClosedIcon
  },
  {
    name: 'Operational efficiency ',
    description: 'Ensuring that every farmer has the support they need to thrive in an increasingly demanding environment.',
    icon: 'carbon:operations-record', // was RefreshIcon
  },
  {
    name: 'Community',
    description: 'Together, we cultivate a community of excellence in the dairy industry made by diary farmers',
    icon: 'fluent:people-community-add-28-filled', // was ShieldCheckIcon
  },
]

export default function InformationPacks() {
  return (
    <div className="relative bg-zinc-100 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-600 dark:text-zinc-400">
          Agri Force
        </h2>
        <p className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
          The Employment you need
        </p>
        <p className="mx-auto mt-5 max-w-prose text-xl text-zinc-700 dark:text-zinc-300">
          Bridging the gap between dedicated dairy farmers and skilled professionals
        </p>

        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="pt-6">
                <div className="flow-root rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-6 pb-8 transition-colors hover:border-zinc-300 dark:hover:border-zinc-700">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center rounded-md bg-zinc-200 dark:bg-zinc-8 00 p-3 shadow-lg">
                        <Icon
                          icon={feature.icon}
                          width="24"
                          height="24"
                          className="text-zinc-900 dark:text-zinc-100"
                          aria-hidden="true"
                        />
                        {/* If an icon doesn't inherit color from text, you can set `color` prop instead */}
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium tracking-tight">
                      {feature.name}
                    </h3>
                    <p className="mt-5 text-base text-zinc-700 dark:text-zinc-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
