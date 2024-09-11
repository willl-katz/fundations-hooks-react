import { useContext, useEffect, useRef, useState } from 'react';
import {
  decrementCounter,
  incrementCounter,
} from '../../contexts/CounterProvider/action';
import { CounterContext } from '../../contexts/CounterProvider/context';
import { loadPosts } from '../../contexts/PostsProvider/actions';
import { PostsContext } from '../../contexts/PostsProvider/context';
import { Menu } from '../Menu';

const isObjectEqual = (objA, objB) => {
  return JSON.stringify(objA) === JSON.stringify(objB)
}

const useFetch = (url, options) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const urlRef = useRef(null)
  const optionsRef = useRef(null);

  useEffect(() => {
    if (!shouldLoad) {
      if (!isObjectEqual(url, urlRef.current)) {
        urlRef.current = url;
      }
      if (!isObjectEqual(options, optionsRef.current)) {
        optionsRef.current = options;
      }
      setShouldLoad((s) => !s);
    }
  }, [url, options])

  useEffect(() => {
    let wait = false;
    const controller = new AbortController();
    const signal = controller.signal;
    // Função para buscar dados
    const fetchData = async () => {
      try {
        const response = await fetch(urlRef.current, {
          signal,
          ...optionsRef.current,
        });
        const jsonResult = await response.json();
        if (!wait) {
          setResult(jsonResult);
          setLoading(false);
        }
      } catch (error) {
        // Tratamento de erro mais robusto (você pode personalizar conforme necessário)
        console.log('Erro ao buscar dados:', error);
        if (!wait) {
          setLoading(false);
        }
      }
    };

    // Iniciar a busca de dados
    fetchData();

    // Função de limpeza (executada quando o componente é desmontado)
    return () => {
      wait = true;
      controller.abort();
    };
  }, [shouldLoad]);


  return [result, loading];
};

export const Posts = () => {
  // const isMounted = useRef(true);

  // const postsContext = useContext(PostsContext);
  // const { postsState, postsDispatch } = postsContext;

  // const counterContext = useContext(CounterContext);
  // const { counterState, counterDispatch } = counterContext;

  // useEffect(() => {
  //   loadPosts(postsDispatch).then((dispatch) => {
  //     if (isMounted.current) {
  //       dispatch();
  //     }
  //   });

  //   return () => {
  //     isMounted.current = false;
  //   };
  // }, [postsDispatch]);

  const [result, loading] = useFetch(
    'https://jsonplaceholder.typicode.com/posts',
    {}
  );

  // 2

  useEffect(() => {
    console.log(result);
  }, [result]);

  return (
    <div>
      {/* <button onClick={() => incrementCounter(counterDispatch)}>
        Counter {counterState.counter}+
      </button>
      <button onClick={() => decrementCounter(counterDispatch)}>
        Counter {counterState.counter}-
      </button>
      <h1>POSTS</h1> */}
      {loading && (
        <p>
          <strong>Carregando posts...</strong>
        </p>
      )}

      {result?.map((p) => (
        <p key={p.id}>{p.title}</p>
      ))}
    </div>
  );
};
