<template>
  <div class="EmojiReactions">
    <UserListPopover
      v-for="(reaction) in emojiReactions"
      :key="reaction.url || reaction.name"
      :users="accountsForEmoji[reaction.name]"
    >
      <button
        class="emoji-reaction btn button-default"
        :class="{ '-picked-reaction': reactedWith(reaction.name), 'not-clickable': !loggedIn }"
        @click="emojiOnClick(reaction.name, $event)"
        @mouseenter="fetchEmojiReactionsByIfMissing()"
      >
        <span
          class="reaction-emoji"
        >
          <img
            v-if="reaction.url"
            :src="reaction.url"
            :title="reaction.name"
            class="reaction-emoji-content"
            width="1em"
          >
          <span
            v-else
            class="reaction-emoji reaction-emoji-content"
          >{{ reaction.name }}</span>
        </span>
        <span>{{ reaction.count }}</span>
      </button>
    </UserListPopover>
    <a
      v-if="tooManyReactions"
      class="emoji-reaction-expand faint"
      href="javascript:void(0)"
      @click="toggleShowAll"
    >
      {{ showAll ? $t('general.show_less') : showMoreString }}
    </a>
  </div>
</template>

<script src="./emoji_reactions.js"></script>
<style lang="scss">
@import "../../variables";

.EmojiReactions {
  display: flex;
  margin-top: 0.25em;
  flex-wrap: wrap;

  --emoji-size: calc(1.25em * var(--emojiReactionsScale, 1));

  .emoji-reaction {
    padding: 0 0.5em;
    margin-right: 0.5em;
    margin-top: 0.5em;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;

    .reaction-emoji {
      width: var(--emoji-size);
      height: var(--emoji-size);
      margin-right: 0.25em;
      line-height: var(--emoji-size);
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .reaction-emoji-content {
      max-width: 100%;
      max-height: 100%;
      width: auto;
      height: auto;
      line-height: inherit;
      overflow: hidden;
      font-size: calc(var(--emoji-size) * 0.8);
      margin: 0;
    }

    &:focus {
      outline: none;
    }

    &.not-clickable {
      cursor: default;

      &:hover {
        box-shadow: $fallback--buttonShadow;
        box-shadow: var(--buttonShadow);
      }
    }

    &.-picked-reaction {
      border: 1px solid var(--accent, $fallback--link);
      margin-left: -1px; // offset the border, can't use inset shadows either
      margin-right: calc(0.5em - 1px);
    }
  }

  .emoji-reaction-expand {
    padding: 0 0.5em;
    margin-right: 0.5em;
    margin-top: 0.5em;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
