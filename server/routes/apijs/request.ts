import axios from "axios";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);
  const url = query.url as string;

  if (!url) {
    return {
      error: true,
      message: 'Не передан параметр "url"',
    };
  }

  try {
    const { data } = await axios.get(url, {
      baseURL: config.public.url,
    });
    return data;
  } catch (error) {
    return {
      error: true,
      message: "Ошибка при запросе к внешнему серверу",
      details: error instanceof Error ? error.message : error,
    };
  }
});
