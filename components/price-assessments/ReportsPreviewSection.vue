<template>
  <section v-if="reports.length">
    <h2
      class="text-p-em-high mb-3 mt-8 text-2xl font-bold md:mt-12 lg:mb-7 lg:text-3xl"
    >
      Reports
    </h2>
    <AssessmentsReportListHeader />
    <div class="flex flex-col gap-4">
      <AssessmentsReportRow
        v-for="report in reports"
        :key="report.ID"
        :data="report"
        :category="category"
        :authorized="authorized"
        :logged-in="loggedIn"
        :membership="membership"
      />
    </div>
    <CommonButton
      v-if="authorized"
      :link="`/${path}/${slug}/reports`"
      variant="tertiary"
      extra-classes="mt-4 font-semibold"
      data-testid="view-all-reports"
    >
      See more Reports
    </CommonButton>
  </section>
</template>

<script>
import AuthenticationMixin from '~/mixins/AuthenticationMixin'
import AssessmentsReportListHeader from '~/components/assessments/ReportListHeader.vue'
import AssessmentsReportRow from '~/components/assessments/ReportRow.vue'
import CommonButton from '~/components/common/Button.vue'
import { PRICE_ASSESSMENTS } from '~/constants/services/constants'

export default {
  components: {
    AssessmentsReportListHeader,
    AssessmentsReportRow,
    CommonButton,
  },
  mixins: [AuthenticationMixin],
  props: {
    slug: {
      type: String,
      required: true,
    },
    reports: {
      type: Array,
      required: true,
    },

    authorized: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      required: true,
    },
    membership: {
      type: String,
      default: '',
    },
    path: {
      type: String,
      default: PRICE_ASSESSMENTS.slug,
    },
  },
}
</script>
