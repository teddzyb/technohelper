const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageAttachment } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Displays info based on input')
        .addSubcommand(subcommand =>
            subcommand
                .setName('user')
                .setDescription('Display information of a user')
                .addUserOption(option => option.setName('target').setDescription('mention a user')))
        .addSubcommand(subcommand =>
            subcommand
                .setName('server')
                .setDescription('Display information of the server')),
	async execute(interaction, client) {
		if (interaction.options.getSubcommand() === "user") {
            const user = interaction.options.getUser("target");
            const member = interaction.options.getMember("target");
            if (user) {
                let date = member.joinedAt;
                let phTime = date.toLocaleString("en-US", { timeZone: "Asia/Manila" });
                const userEmbed = new MessageEmbed()
                    .setTitle(`${user.username}'s Information`)
                    .setDescription(`Requested by <@${interaction.user.id}>`)
                    .setThumbnail(user.displayAvatarURL())
                    .addFields(
                        { name: `User Tag:`, value: `${user.tag}`, inline: true },
                        { name: `User ID:`, value: `${user.id}`, inline: true },
                        { name: `Joined At:`, value: `${phTime} (PHT)`, inline: false }
                    )
                    .setTimestamp()
                    .setColor("#21302b")
                    .setFooter(client.user.tag, client.user.displayAvatarURL());

                await interaction.reply({ embeds: [userEmbed] });
            } else {
                let date = interaction.member.joinedAt;
                let phTime = date.toLocaleString("en-US", { timeZone: "Asia/Manila" });
                const userEmbed = new MessageEmbed()
                    .setTitle(`${interaction.user.username}'s Information`)
                    .setDescription(`Requested by <@${interaction.user.id}>`)
                    .setThumbnail(interaction.user.displayAvatarURL())
                    .addFields(
                        { name: `User Tag:`, value: `${interaction.user.tag}`, inline: true },
                        { name: `User ID:`, value: `${interaction.user.id}`, inline: true },
                        { name: `Joined At:`, value: `${phTime} (PHT)`, inline: false }
                    )
                    .setTimestamp()
                    .setColor("#21302b")
                    .setFooter(client.user.tag, client.user.displayAvatarURL());

                await interaction.reply({ embeds: [userEmbed] });
            }
        } else if (interaction.options.getSubcommand() === "server") {
            let date = interaction.guild.createdAt;
            let phTime = date.toLocaleString("en-US", { timeZone: "Asia/Manila" });
            const userEmbed = new MessageEmbed()
                    .setTitle(`Server Information`)
                    .setDescription(`Requested by <@${interaction.user.id}>`)
                    .setThumbnail(interaction.guild.iconURL)
                    .addFields(
                        { name: `Name:`, value: `${interaction.guild.name}`, inline: true },
                        { name: `Member Count:`, value: `${interaction.guild.memberCount}`, inline: true },
                        { name: `Region:`, value: `🇵🇭 Philippines`, inline: true },
                        { name: `Description:`, value: `${interaction.guild.description}`, inline: false },
                        { name: `Created At:`, value: `${phTime} (PHT)`, inline: true }
                    )
                    .setTimestamp()
                    .setColor("#21302b")
                    .setFooter(client.user.tag, client.user.displayAvatarURL());

                await interaction.reply({ embeds: [userEmbed] });
        } else {
            await interaction.reply("What information are you looking for? 🧐");
        }
	},
};