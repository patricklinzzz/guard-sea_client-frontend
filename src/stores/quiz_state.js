import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useQuizStore = defineStore('quiz', () => {
  const quiz_start = ref(false)
  const start_anime_end = ref(false)
  const option_shown = ref(true)
  const show_result = ref(false)
  const score = ref(0)
  const log_in_prompted = ref(false)

  const quizReset = () => {
    quiz_start.value = false
    start_anime_end.value = false
    option_shown.value = true
    show_result.value = false
    score.value = 0
    log_in_prompted.value = false
  }
  return {
    quiz_start,
    start_anime_end,
    option_shown,
    show_result,
    score,
    log_in_prompted,
    quizReset,
  }
})
