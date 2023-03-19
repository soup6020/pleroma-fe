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
      <h2>{{ $t('admin_dash.registrations') }}</h2>
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
      </ul>
    </div>
  </div>
</template>

<script src="./instance_tab.js"></script>
