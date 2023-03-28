<template>
  <div class="frontends-tab" :label="$t('admin_dash.tabs.frontends')">
    <div class="setting-item">
      <h2>{{ $t('admin_dash.tabs.frontends') }}</h2>
      <ul class="setting-list cards-list">
        <li v-for="frontend in frontends" :key="frontend.name">
          <strong>{{ frontend.name }}</strong>
          <dl>
            <dt>{{ $t('admin_dash.frontend.repository') }}</dt>
            <dd><a :href="frontend.git">{{ frontend.git }}</a></dd>
            <dt v-if="expertLevel">{{ $t('admin_dash.frontend.versions') }}</dt>
            <dd v-if="expertLevel">{{ frontend.refs }}</dd>
            <dt v-if="expertLevel">{{ $t('admin_dash.frontend.build_url') }}</dt>
            <dd v-if="expertLevel">{{ frontend.build_url }}</dd>
          </dl>
          <div>
            <span class="btn-group">
              <button
                class="button button-default btn"
                type="button"
                :title="$t('admin_dash.frontend.update')"
                @click="update(frontend)"
              >
                {{
                    frontend.installed
                    ? $t('admin_dash.frontend.reinstall')
                    : $t('admin_dash.frontend.install')
                }}
              </button>
              <Popover
                v-if="frontend.refs.length > 1"
                trigger="click"
                class="button-dropdown"
                placement="bottom"
              >
                <template #content>
                  <div class="dropdown-menu">
                    <button
                      v-for="ref in frontend.refs"
                      :key="ref"
                      class="button-default dropdown-item"
                      @click="update(frontend, ref)"
                    >
                      <i18n-t keypath="admin_dash.frontend.install_version">
                        <template #version>
                          <code>{{ ref }}</code>
                        </template>
                      </i18n-t>
                    </button>
                  </div>
                </template>
                <template #trigger>
                  <button
                    class="button button-default btn"
                    type="button"
                    :title="$t('admin_dash.frontend.update')"
                  >
                    <FAIcon icon="chevron-down" />
                  </button>
                </template>
              </Popover>
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script src="./frontends_tab.js"></script>

<style lang="scss" src="./frontends_tab.scss"></style>
