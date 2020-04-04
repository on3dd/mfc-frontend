<template>
  <div class="datalist-placeholder">
    <div class="input-placeholder">
      <img src="../assets/images/search-icon.svg" class="input__icon" alt="Поиск">
      <input
          @input="updateData"
          @click="isActive = true"
          v-model="currentOption"
          ref="input"
          class="input"
          type="text"
          :placeholder="placeholder"
          :disabled="isDisabled"
      >
    </div>
    <ul
        ref="datalist"
        :class="['datalist', isActive ? 'active': '']">
      <li
          @click="changeActive"
          v-for="(item, idx) in activeOptions"
          :key="idx"
          class="datalist__item"
      >{{item}}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import {Component, Vue, Prop, Watch} from "vue-property-decorator";

  @Component
  export default class BaseDatalist extends Vue {
    $refs!: {
      input: HTMLInputElement;
      datalist: HTMLUListElement;
    };

    @Prop({type: String, required: true}) name!: string;
    @Prop({type: Array, required: true}) data!: string[];
    @Prop({type: String, required: false}) placeholder!: string;
    @Prop({type: Boolean, required: false}) isDisabled!: boolean;

    @Watch('data')
    onDataChange(data: string[], oldData: string[]) {
      if (data.length === oldData.length) return;

      this.activeOptions = this.data;
      this.currentOption = this.data[0];
    }

    private activeOptions = this.data;
    private isActive = false;
    private currentOption = this.data[0];

    mounted() {
      this.$emit('select', this.currentOption);

      document.addEventListener('click', (evt: MouseEvent) => {
        if (this.isActive && (evt.target !== this.$refs.datalist) && (evt.target !== this.$refs.input)) {
          this.isActive = false;
        }
      })
    }

    updateData() {
      this.activeOptions = this.data.filter((el: string) => el.includes(this.currentOption));
      this.isActive = true;
    }

    changeActive(evt: MouseEvent) {
      const textContent = (evt.target as HTMLElement).textContent;
      if ((textContent === undefined) || (textContent === null)) return;

      this.currentOption = textContent;
      this.$emit('select', this.currentOption);
    }
  }
</script>

<style scoped lang="scss">
  @import "../scss/colors";
  @import "../scss/breakpoints";

  .datalist-placeholder {
    position: relative;
    width: 100%;
    height: 32px;
    font-size: 14px;

    @media (min-width: $breakpoint-tablet) {
      height: 45px;
      font-size: 18px;
    }

    @media (min-width: $breakpoint-laptop) {
      height: 60px;
      font-size: 24px;
    }

    @media (min-width: $breakpoint-desktop) {
      height: 90px;
      font-size: 36px;
    }

    .input-placeholder {
      position: absolute;
      width: inherit;
      height: inherit;
      font-size: inherit;
      z-index: 5;

      .input {
        width: inherit;
        height: inherit;
        border-radius: 80px;
        border: 2px solid $mfc-orange;
        font-size: inherit;
        padding: 0 1em 0 2.75em;
        transition: all .2s ease-out;

        @media (min-width: $breakpoint-desktop) {
          border-width: 4px;
        }

        &[disabled] {
          border-color: $mfc-light-gray;
        }

        &__icon {
          position: absolute;
          top: 50%;
          left: 1em;
          transform: translateY(-50%);
          height: 1.25em;
          width: 1.25em;
        }
      }
    }

    .datalist {
      // doesn't work anymore - only for reference
      // $font-size: 36px;
      // $item-height: $font-size * 1.5;
      // $padding-top: 85 + $font-size * 0.5;
      // $max-height: $item-height * 5 + $padding-top + 36px;

      display: none;
      position: absolute;
      top: 0;
      width: inherit;
      font-size: 14px;
      list-style: none;
      margin: 0;
      padding: calc(27px + 14px * 0.5) 0 1em 0;
      background: #ffffff;
      border: 2px solid $mfc-orange;
      border-radius: 20px;
      max-height: calc(1.5 * 14px * 5 + 27 + 14px * 0.5);
      overflow-y: auto;
      overflow-x: hidden;
      transition: all .2s ease-out;
      box-shadow: 0 20px 20px 0 rgba(0, 0, 0, .1);
      z-index: 1;

      /* Hide scrollbar for IE and MS Edge */
      -ms-overflow-style: none;
      /* Hide scrollbar for Chrome, Safari and Opera */
      &::-webkit-scrollbar {
        display: none;
      }

      &.active {
        display: block;
      }

      @media (min-width: $breakpoint-tablet) {
        font-size: 18px;
        padding: calc(40px + 18px * 0.5) 0 1em 0;
        max-height: calc(1.5 * 18px * 5 + 18px + 18px * 0.5);
        border-radius: 30px;
      }

      @media (min-width: $breakpoint-laptop) {
        font-size: 24px;
        padding: calc(55px + 24px * 0.5) 0 1em 0;
        max-height: calc(1.5 * 24px * 5 + 24px + 24px * 0.5);
        border-radius: 40px;
      }

      @media (min-width: $breakpoint-desktop) {
        font-size: 36px;
        padding: calc(85px + 36px * 0.5) 0 1em 0;
        max-height: calc(1.5 * 36px * 5 + 36px + 36px * 0.5);
        border-width: 4px;
        border-radius: 50px;
      }

      &__item {
        width: inherit;
        padding: 0 1em;
        font-size: inherit;
        border-bottom: 1px solid rgba(0, 0, 0, .1);
        transition: .1s background-color ease-out;
        cursor: pointer;
        text-transform: capitalize;
        color: rgba(0, 0, 0, .5);

        &:hover {
          color: rgba(0, 0, 0, .75);
          background: rgba(0, 0, 0, .1);
        }
      }
    }
  }
</style>