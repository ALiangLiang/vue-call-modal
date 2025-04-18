import { createApp, ref, h, type App, type Component as ComponentType, type Plugin } from 'vue'
import type { ComponentProps } from 'vue-component-type-helpers'

interface MakeComponentFunctionOptions {
  toggleProp?: string
  plugins?: Plugin[]
  keepAlive?: boolean
}

type AllowVoidWhenAllOptional<T> =
  keyof T extends never ? void :
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    { [K in keyof T]-?: {} extends Pick<T, K> ? true : false }[keyof T] extends true
      ? T | void
      : T

export function makeComponentFunction<
  T extends ComponentType,
  Props = ComponentProps<T>,
  ResolveType = Parameters<ComponentProps<T>['onResolve']>[0],
  RejectType = Parameters<ComponentProps<T>['onReject']>[0]
> (
  Component: T,
  options: MakeComponentFunctionOptions = { toggleProp: 'show', plugins: [], keepAlive: true }
) {
  let instance: App<Element> | undefined
  let mountNode: HTMLDivElement | undefined

  const props = ref({})
  const show = ref(false)
  const onResolve = ref<(data: ResolveType) => void>()
  const onReject = ref<(err: RejectType) => void>()

  function unmount () {
    instance?.unmount()
    if (mountNode) {
      document.body.removeChild(mountNode)
    }
    instance = undefined
    mountNode = undefined
  }

  function initInstance () {
    mountNode = document.createElement('div')
    instance = createApp({
      render: () => h(
        Component,
        {
          ...props.value,

          // two way binding
          [options.toggleProp ?? 'show']: show.value,
          [`onUpdate:${options.toggleProp ?? 'show'}`]: (val: boolean) => {
            show.value = val
            if (!val && !(options.keepAlive ?? true)) {
              unmount()
            }
          },

          // promise
          onResolve: (data: ResolveType) => onResolve.value?.(data),
          onReject: (err: RejectType) => onReject.value?.(err)
        }
      )
    })

    // use plugins
    for (const plugin of (options.plugins ?? [])) {
      instance.use(plugin)
    }

    // mount
    document.body.appendChild(mountNode)
    instance.mount(mountNode)

    return instance
  }

  return [
    function showComponent (options: AllowVoidWhenAllOptional<Props>) {
      props.value = {
        ...props.value,
        // oxlint-disable-next-line eslint-plugin-unicorn(no-useless-fallback-in-spread)
        ...(options ?? {})
      }
      return new Promise<ResolveType>((resolve, reject) => {
        if (!instance) {
          instance = initInstance()
        }

        show.value = true
        onResolve.value = resolve
        onReject.value = reject
      })
    },
    unmount
  ] as const
}
