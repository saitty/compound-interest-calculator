import { ref, watch } from "vue";

export function useStorage(key: string, val: any, deep: boolean = false) {
  let storedValue = localStorage.getItem(key);

  if (storedValue) {
    val = ref(JSON.parse(storedValue));
  } else {
    val = ref(val);
  }

  watch(val, () => {
    write();
  }, { deep: deep });

  function write() {
    if (val.value === null || val.value === undefined || val.value === '') {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(val.value));
    }
  }

  return val;
}
