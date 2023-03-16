<template>
  <div :label="$t('admin_dash.instance')">
    <div class="setting-item">
      <h2>{{ $t('admin_dash.instance') }}</h2>
      <ul class="setting-list">
        <li>
          <StringSetting
            source="admin"
            path=":pleroma.:instance.:name"
            draft-mode
          >
            NAME
          </StringSetting>
        </li>
        <li>
          <StringSetting
            source="admin"
            path=":pleroma.:instance.:description"
            draft-mode
          >
            DESCRIPTION
          </StringSetting>
        </li>
        <li>
          <IntegerSetting
            source="admin"
            path=":pleroma.:instance.:limit"
            draft-mode
          >
            POST LIMIT
          </IntegerSetting>
        </li>
      </ul>
    </div>
  </div>
</template>

<script src="./instance_tab.js"></script>

<style lang="scss">
.column-settings {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
}

.column-settings .size-label {
  display: block;
  margin-bottom: 0.5em;
  margin-top: 0.5em;
}
</style>
