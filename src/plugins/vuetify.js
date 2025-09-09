/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import colors from 'vuetify/util/colors'

// Composables
import { createVuetify } from 'vuetify'
import { VNumberInput } from 'vuetify/labs/VNumberInput'
import { VDateInput } from 'vuetify/labs/VDateInput'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  locale: {
    locale: 'th',
  },
  date: {
    locale: {
      th: 'th-TH',
    },
  },
  components: {
     VNumberInput,
     VDateInput,
  },
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          primary: colors.red.darken1,
          secondary: colors.pink.darken1,
          accent: colors.blue.darken1,
          error: colors.deepOrange.darken1,
          warning: colors.amber.darken1,
          info: colors.teal.darken1,
          success: colors.green.darken1
        }
      },
    },
  },
})
