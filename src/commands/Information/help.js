const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageAttachment } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Displays a list of usable commands'),
    async execute(interaction, client) {
        const userEmbed = new MessageEmbed()
            .setTitle(`Bot Commands`)
            .setDescription(`Requested by <@${interaction.user.id}>\nType the command in chat for its usage and description`)
            .addFields(
                { name: `Information`, value: '```/help\n/info\n/ping```', inline: true },
                { name: `Utility`, value: '```Coming soon!```', inline: true },
                { name: `Moderation`, value: '```Coming soon!```', inline: true }
            )
            .setTimestamp()
            .setColor("ORANGE")
            .setFooter(client.user.tag, client.user.displayAvatarURL());

        await interaction.reply({ embeds: [userEmbed] });
    },
};