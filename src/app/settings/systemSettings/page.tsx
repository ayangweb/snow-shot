'use client';

import { GroupTitle } from '@/components/groupTitle';
import { Form, Spin, Switch } from 'antd';
import { AppSettingsActionContext, AppSettingsData, AppSettingsGroup } from '../../contextWrap';
import { useCallback, useContext, useState } from 'react';
import { useAppSettingsLoad } from '@/hooks/useAppSettingsLoad';
import { FormattedMessage } from 'react-intl';
import { ContentWrap } from '@/components/contentWrap';
import { IconLabel } from '@/components/iconLable';
import { ResetSettingsButton } from '@/components/resetSettingsButton';
import ProForm, { ProFormSlider } from '@ant-design/pro-form';

export default function SystemSettings() {
    const { updateAppSettings } = useContext(AppSettingsActionContext);
    const [commonForm] = Form.useForm<AppSettingsData[AppSettingsGroup.SystemCommon]>();
    const [renderForm] = Form.useForm<AppSettingsData[AppSettingsGroup.Render]>();
    const [chatForm] = Form.useForm<AppSettingsData[AppSettingsGroup.SystemChat]>();
    const [networkForm] = Form.useForm<AppSettingsData[AppSettingsGroup.SystemNetwork]>();

    const [appSettingsLoading, setAppSettingsLoading] = useState(true);
    useAppSettingsLoad(
        useCallback(
            (settings: AppSettingsData, preSettings?: AppSettingsData) => {
                setAppSettingsLoading(false);

                if (
                    preSettings === undefined ||
                    preSettings[AppSettingsGroup.Render] !== settings[AppSettingsGroup.Render]
                ) {
                    renderForm.setFieldsValue(settings[AppSettingsGroup.Render]);
                }

                if (
                    preSettings === undefined ||
                    preSettings[AppSettingsGroup.SystemCommon] !==
                        settings[AppSettingsGroup.SystemCommon]
                ) {
                    commonForm.setFieldsValue(settings[AppSettingsGroup.SystemCommon]);
                }

                if (
                    preSettings === undefined ||
                    preSettings[AppSettingsGroup.SystemChat] !==
                        settings[AppSettingsGroup.SystemChat]
                ) {
                    chatForm.setFieldsValue(settings[AppSettingsGroup.SystemChat]);
                }

                if (
                    preSettings === undefined ||
                    preSettings[AppSettingsGroup.SystemNetwork] !==
                        settings[AppSettingsGroup.SystemNetwork]
                ) {
                    networkForm.setFieldsValue(settings[AppSettingsGroup.SystemNetwork]);
                }
            },
            [renderForm, commonForm, chatForm, networkForm],
        ),
        true,
    );
    return (
        <ContentWrap>
            <GroupTitle
                id="commonSettings"
                extra={
                    <ResetSettingsButton
                        title={<FormattedMessage id="settings.systemSettings.commonSettings" />}
                        appSettingsGroup={AppSettingsGroup.SystemCommon}
                    />
                }
            >
                <FormattedMessage id="settings.systemSettings.commonSettings" />
            </GroupTitle>

            <Spin spinning={appSettingsLoading}>
                <ProForm
                    form={commonForm}
                    onValuesChange={(_, values) => {
                        updateAppSettings(
                            AppSettingsGroup.SystemCommon,
                            values,
                            true,
                            true,
                            false,
                            true,
                        );
                    }}
                    submitter={false}
                    layout="horizontal"
                >
                    <ProForm.Item
                        label={
                            <IconLabel
                                label={
                                    <FormattedMessage id="settings.systemSettings.commonSettings.autoStart" />
                                }
                            />
                        }
                        name="autoStart"
                        valuePropName="checked"
                    >
                        <Switch />
                    </ProForm.Item>
                </ProForm>
            </Spin>

            <GroupTitle
                id="renderSettings"
                extra={
                    <ResetSettingsButton
                        title={
                            <FormattedMessage id="settings.renderSettings" key="renderSettings" />
                        }
                        appSettingsGroup={AppSettingsGroup.Render}
                    />
                }
            >
                <FormattedMessage id="settings.renderSettings" />
            </GroupTitle>

            <Spin spinning={appSettingsLoading}>
                <ProForm
                    form={renderForm}
                    onValuesChange={(_, values) => {
                        updateAppSettings(AppSettingsGroup.Render, values, true, true, true);
                    }}
                    submitter={false}
                    layout="horizontal"
                >
                    <ProForm.Item
                        label={<IconLabel label={<FormattedMessage id="settings.antialias" />} />}
                        name="antialias"
                        valuePropName="checked"
                    >
                        <Switch />
                    </ProForm.Item>
                </ProForm>
            </Spin>

            <GroupTitle
                id="networkSettings"
                extra={
                    <ResetSettingsButton
                        title={<FormattedMessage id="settings.systemSettings.networkSettings" />}
                        appSettingsGroup={AppSettingsGroup.SystemNetwork}
                    />
                }
            >
                <FormattedMessage id="settings.systemSettings.networkSettings" />
            </GroupTitle>

            <Spin spinning={appSettingsLoading}>
                <ProForm
                    form={networkForm}
                    onValuesChange={(_, values) => {
                        updateAppSettings(
                            AppSettingsGroup.SystemNetwork,
                            values,
                            true,
                            true,
                            false,
                            true,
                        );
                    }}
                    submitter={false}
                    layout="horizontal"
                >
                    <ProForm.Item
                        label={
                            <IconLabel
                                label={
                                    <FormattedMessage id="settings.systemSettings.networkSettings.proxy" />
                                }
                            />
                        }
                        name="enableProxy"
                        valuePropName="checked"
                    >
                        <Switch />
                    </ProForm.Item>
                </ProForm>
            </Spin>

            <GroupTitle
                id="chatSettings"
                extra={
                    <ResetSettingsButton
                        title={<FormattedMessage id="settings.chatSettings" key="chatSettings" />}
                        appSettingsGroup={AppSettingsGroup.SystemChat}
                    />
                }
            >
                <FormattedMessage id="settings.chatSettings" />
            </GroupTitle>

            <Spin spinning={appSettingsLoading}>
                <ProForm
                    form={chatForm}
                    onValuesChange={(_, values) => {
                        updateAppSettings(
                            AppSettingsGroup.SystemChat,
                            values,
                            true,
                            true,
                            false,
                            true,
                        );
                    }}
                    submitter={false}
                >
                    <ProFormSlider
                        label={
                            <IconLabel
                                label={<FormattedMessage id="settings.chatSettings.maxTokens" />}
                                tooltipTitle={
                                    <FormattedMessage id="settings.chatSettings.maxTokens.tip" />
                                }
                            />
                        }
                        name="maxTokens"
                        min={512}
                        max={8192}
                        step={128}
                        marks={{
                            512: '512',
                            4096: '4096',
                            8192: '8192',
                        }}
                    />

                    <ProFormSlider
                        label={
                            <IconLabel
                                label={<FormattedMessage id="settings.chatSettings.temperature" />}
                                tooltipTitle={
                                    <FormattedMessage id="settings.chatSettings.temperature.tip" />
                                }
                            />
                        }
                        name="temperature"
                        min={0}
                        max={2}
                        step={0.1}
                        marks={{
                            0: '0',
                            1: '1',
                            2: '2',
                        }}
                    />

                    <ProFormSlider
                        label={
                            <IconLabel
                                label={
                                    <FormattedMessage id="settings.chatSettings.thinkingBudgetTokens" />
                                }
                                tooltipTitle={
                                    <FormattedMessage id="settings.chatSettings.thinkingBudgetTokens.tip" />
                                }
                            />
                        }
                        name="thinkingBudgetTokens"
                        min={1024}
                        max={8192}
                        step={128}
                        marks={{
                            1024: '1024',
                            4096: '4096',
                            8192: '8192',
                        }}
                    />
                </ProForm>
            </Spin>
        </ContentWrap>
    );
}
