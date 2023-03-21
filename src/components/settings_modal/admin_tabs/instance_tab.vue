<template>
  <div :label="$t('admin_dash.tabs.instance')">
    <div class="setting-item">
      <h2>{{ $t('admin_dash.instance.instance') }}</h2>
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
            path=":pleroma.:instance.:email"
            draft-mode
          >
            ADMIN EMAIL
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
          <StringSetting
            source="admin"
            path=":pleroma.:instance.:short_description"
            draft-mode
          >
            SHORT DESCRIPTION
          </StringSetting>
        </li>
        <li>
          <StringSetting
            source="admin"
            path=":pleroma.:instance.:instance_thumbnail"
            draft-mode
          >
            INSTANCE THUMBNAIL
          </StringSetting>
        </li>
        <li>
          <StringSetting
            source="admin"
            path=":pleroma.:instance.:background_image"
            draft-mode
          >
            BACKGROUND IMAGE
          </StringSetting>
        </li>
        <li>
          <BooleanSetting
            source="admin"
            path=":pleroma.:instance.:public"
            draft-mode
          >
            PUBLIC
          </BooleanSetting>
        </li>
      </ul>
    </div>
    <div class="setting-item">
      <h2>{{ $t('admin_dash.instance.registrations') }}</h2>
      <ul class="setting-list">
        <li>
          <BooleanSetting
            source="admin"
            path=":pleroma.:instance.:registrations_open"
            draft-mode
          >
            REGISTRATIONS OPEN
          </BooleanSetting>
          <ul class="setting-list suboptions">
            <li>
              <BooleanSetting
                source="admin"
                path=":pleroma.:instance.:invites_enabled"
                parent-path=":pleroma.:instance.:registrations_open"
                :parent-invert="true"
                draft-mode
              >
                INVITES ENABLED
              </BooleanSetting>
            </li>
          </ul>
        </li>
        <li>
          <BooleanSetting
            source="admin"
            path=":pleroma.:instance.:account_activation_required"
            draft-mode
          >
            ACTIVATION REQUIRED
          </BooleanSetting>
        </li>
        <li>
          <BooleanSetting
            source="admin"
            path=":pleroma.:instance.:account_approval_required"
            draft-mode
          >
            APPROVAL REQUIRED
          </BooleanSetting>
        </li>
        <li>
          <h3>{{ $t('admin_dash.instance.captcha_header') }}</h3>
        </li>
        <li>
          <BooleanSetting
            source="admin"
            :path="[':pleroma', 'Pleroma.Captcha', ':enabled']"
            draft-mode
          >
            CAPTCHA
          </BooleanSetting>
          <ul class="setting-list suboptions">
            <li>
              <ChoiceSetting
                source="admin"
                :path="[':pleroma', 'Pleroma.Captcha', ':method']"
                :parent-path="[':pleroma', 'Pleroma.Captcha', ':enabled']"
                :option-label-map="{
                  'Pleroma.Captcha.Native': $t('admin_dash.captcha.native'),
                  'Pleroma.Captcha.Kocaptcha': $t('admin_dash.captcha.kocaptcha')
                }"
                draft-mode
              >
                CAPTCHA TYPE
              </ChoiceSetting>
              <IntegerSetting
                source="admin"
                :path="[':pleroma', 'Pleroma.Captcha', ':seconds_valid']"
                :parent-path="[':pleroma', 'Pleroma.Captcha', ':enabled']"
                draft-mode
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
              <StringSetting
                source="admin"
                :path="[':pleroma', 'Pleroma.Captcha.Kocaptcha', ':endpoint']"
                draft-mode
              >
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
