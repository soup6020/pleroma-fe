<template>
  <div :label="$t('admin_dash.tabs.instance')">
    <div class="setting-item">
      <h2>{{ $t('admin_dash.instance.instance') }}</h2>
      <ul class="setting-list">
        <li>
          <StringSetting path=":pleroma.:instance.:name">
            NAME
          </StringSetting>
        </li>
        <li>
          <StringSetting path=":pleroma.:instance.:email">
            ADMIN EMAIL
          </StringSetting>
        </li>
        <li>
          <StringSetting path=":pleroma.:instance.:description">
            DESCRIPTION
          </StringSetting>
        </li>
        <li>
          <StringSetting path=":pleroma.:instance.:short_description">
            SHORT DESCRIPTION
          </StringSetting>
        </li>
        <li>
          <StringSetting path=":pleroma.:instance.:instance_thumbnail">
            INSTANCE THUMBNAIL
          </StringSetting>
        </li>
        <li>
          <StringSetting path=":pleroma.:instance.:background_image">
            BACKGROUND IMAGE
          </StringSetting>
        </li>
      </ul>
    </div>
    <div class="setting-item">
      <h2>{{ $t('admin_dash.instance.access') }}</h2>
      <ul class="setting-list">
        <li>
          <BooleanSetting path=":pleroma.:instance.:public">
            PUBLIC
          </BooleanSetting>
        </li>
        <li>
          <h3>{{ $t('admin_dash.instance.restrict.header') }}</h3>
        </li>
        <li>
          <ChoiceSetting path=":pleroma.:instance.:limit_to_local_content">
            SEARCH RESTRICTION
          </ChoiceSetting>
        </li>
        <li>
          <h4>{{ $t('admin_dash.instance.restrict.timelines') }}</h4>
        </li>
        <li>
          <BooleanSetting
            path=":pleroma.:restrict_unauthenticated.:timelines.:local"
            indeterminate-state=":if_instance_is_private"
          >
            LOCAL TIMELINES
          </BooleanSetting>
        </li>
        <li>
          <BooleanSetting
            path=":pleroma.:restrict_unauthenticated.:timelines.:federated"
            indeterminate-state=":if_instance_is_private"
          >
            FED TIMELINES
          </BooleanSetting>
        </li>
        <li>
          <GroupSetting path=":pleroma.:restrict_unauthenticated.:timelines">
            TIMELINES
          </GroupSetting>
        </li>
        <li>
          <h4>{{ $t('admin_dash.instance.restrict.profiles') }}</h4>
        </li>
        <li>
          <BooleanSetting
            path=":pleroma.:restrict_unauthenticated.:profiles.:local"
            indeterminate-state=":if_instance_is_private"
          >
            LOCAL PROFILES
          </BooleanSetting>
        </li>
        <li>
          <BooleanSetting
            path=":pleroma.:restrict_unauthenticated.:profiles.:remote"
            indeterminate-state=":if_instance_is_private"
          >
            FED PROFILES
          </BooleanSetting>
        </li>
        <li>
          <GroupSetting path=":pleroma.:restrict_unauthenticated.:profiles">
            PROFILES
          </GroupSetting>
        </li>
        <li>
          <h4>{{ $t('admin_dash.instance.restrict.activities') }}</h4>
        </li>
        <li>
          <BooleanSetting
            path=":pleroma.:restrict_unauthenticated.:activities.:local"
            indeterminate-state=":if_instance_is_private"
          >
            LOCAL STATUSES
          </BooleanSetting>
        </li>
        <li>
          <BooleanSetting
            path=":pleroma.:restrict_unauthenticated.:activities.:remote"
            indeterminate-state=":if_instance_is_private"
          >
            FED STATUSES
          </BooleanSetting>
        </li>
        <li>
          <GroupSetting path=":pleroma.:restrict_unauthenticated.:activities">
            STATUSES
          </GroupSetting>
        </li>
      </ul>
    </div>
    <div class="setting-item">
      <h2>{{ $t('admin_dash.instance.registrations') }}</h2>
      <ul class="setting-list">
        <li>
          <BooleanSetting path=":pleroma.:instance.:registrations_open">
            REGISTRATIONS OPEN
          </BooleanSetting>
          <ul class="setting-list suboptions">
            <li>
              <BooleanSetting
                path=":pleroma.:instance.:invites_enabled"
                parent-path=":pleroma.:instance.:registrations_open"
                parent-invert
              >
                INVITES ENABLED
              </BooleanSetting>
            </li>
          </ul>
        </li>
        <li>
          <BooleanSetting path=":pleroma.:instance.:birthday_required">
            BDEY REQUIRED
          </BooleanSetting>
          <ul class="setting-list suboptions">
            <li>
              <IntegerSetting
                path=":pleroma.:instance.:birthday_min_age"
                parent-path=":pleroma.:instance.:birthday_required"
              >
                BDEY age of consent
              </IntegerSetting>
            </li>
          </ul>
        </li>
        <li>
          <BooleanSetting path=":pleroma.:instance.:account_activation_required">
            ACTIVATION REQUIRED
          </BooleanSetting>
        </li>
        <li>
          <BooleanSetting path=":pleroma.:instance.:account_approval_required">
            APPROVAL REQUIRED
          </BooleanSetting>
        </li>
        <li>
          <h3>{{ $t('admin_dash.instance.captcha_header') }}</h3>
        </li>
        <li>
          <BooleanSetting :path="[':pleroma', 'Pleroma.Captcha', ':enabled']">
            CAPTCHA
          </BooleanSetting>
          <ul class="setting-list suboptions">
            <li>
              <ChoiceSetting
                :path="[':pleroma', 'Pleroma.Captcha', ':method']"
                :parent-path="[':pleroma', 'Pleroma.Captcha', ':enabled']"
                :option-label-map="{
                  'Pleroma.Captcha.Native': $t('admin_dash.captcha.native'),
                  'Pleroma.Captcha.Kocaptcha': $t('admin_dash.captcha.kocaptcha')
                }"
              >
                CAPTCHA TYPE
              </ChoiceSetting>
              <IntegerSetting
                :path="[':pleroma', 'Pleroma.Captcha', ':seconds_valid']"
                :parent-path="[':pleroma', 'Pleroma.Captcha', ':enabled']"
              >
                VALID
              </IntegerSetting>
            </li>
          </ul>
          <ul
            v-if="adminConfig[':pleroma']['Pleroma.Captcha'][':enabled'] && adminConfig[':pleroma']['Pleroma.Captcha'][':method'] === 'Pleroma.Captcha.Kocaptcha'"
            class="setting-list suboptions"
          >
            <h4>{{ $t('admin_dash.instance.kocaptcha') }}</h4>
            <li>
              <StringSetting :path="[':pleroma', 'Pleroma.Captcha.Kocaptcha', ':endpoint']">
                cockAPTCHA ENDPOINT
              </StringSetting>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script src="./instance_tab.js"></script>
