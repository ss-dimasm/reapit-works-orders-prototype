import { Axios } from 'core/axios'
import { useQuery } from 'react-query'

type LinkHrefType = {
  href: string | undefined
}

const linkHrefGetFetcher = async <T>({ href }: LinkHrefType): Promise<T> => {
  if (href) {
    const { data } = await Axios.get<T>(href)
    return data
  }

  return new Promise((_res, rej) => rej('href data not assigned'))
}

export const useFetchGetLinkHref = <T extends unknown>(props: LinkHrefType) => {
  return useQuery(['link-href', props], () => linkHrefGetFetcher<T>({ ...props }), {
    retry: false,
  })
}
