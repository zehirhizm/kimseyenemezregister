const { Client, GatewayIntentBits, Partials, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { joinVoiceChannel, getVoiceConnection } = require('@discordjs/voice');
require('dotenv').config();
const config = require('./config');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates
    ],
    partials: [Partials.Channel]
});

client.once('ready', () => {
    console.log(`Bot logged in as ${client.user.tag}`);

    // Set bot activity status
    client.user.setActivity('KY EKİBİNİN HİZMETİNDEDİR.', { type: 0 }); // type: 0 = Playing

    // Join voice channel and stay deafened
    console.log(`Searching for voice channel ID: ${config.channels.voice}`);

    // Check all guilds the bot is in
    client.guilds.cache.forEach(guild => {
        console.log(`Checking guild: ${guild.name} (${guild.id})`);
        const voiceChannel = guild.channels.cache.get(config.channels.voice);

        if (voiceChannel) {
            console.log(`Found voice channel: ${voiceChannel.name} in guild: ${guild.name}`);

            if (voiceChannel.isVoiceBased()) {
                try {
                    const connection = joinVoiceChannel({
                        channelId: voiceChannel.id,
                        guildId: guild.id,
                        adapterCreator: guild.voiceAdapterCreator,
                        selfDeaf: true,
                        selfMute: false
                    });
                    console.log(`✅ Successfully joined voice channel: ${voiceChannel.name} (Deafened)`);
                } catch (error) {
                    console.error(`❌ Failed to join voice channel in ${guild.name}:`, error.message);
                }
            } else {
                console.warn(`⚠️ Channel ${voiceChannel.name} is not a voice-based channel.`);
            }
        }
    });
});

// Auto-assign Unregistered role on join
client.on('guildMemberAdd', async (member) => {
    const unregisteredRole = member.guild.roles.cache.get(config.roles.unregistered);
    if (unregisteredRole) {
        try {
            await member.roles.add(unregisteredRole);
            console.log(`Assigned Unregistered role to ${member.user.tag}`);
        } catch (error) {
            console.error(`Failed to assign role to ${member.user.tag}:`, error);
        }
    } else {
        console.warn('Unregistered role not found in config or server.');
    }
});

// Command to send the registration panel
client.on('messageCreate', async (message) => {
    if (message.content === '!kayitpanel') {
        if (!message.member.permissions.has('Administrator')) return;

        const embed = new EmbedBuilder()
            .setColor('#2F3136')
            .setTitle('Sunucu Kayıt Sistemi')
            .setDescription('Aşağıdaki butonları kullanarak cinsiyetinizi seçip kayıt olabilirsiniz.')
            .addFields(
                { name: 'Erkek', value: '♂️ Emojisine tıklayarak Erkek rolünü alabilirsiniz.', inline: true },
                { name: 'Kadın', value: '♀️ Emojisine tıklayarak Kadın rolünü alabilirsiniz.', inline: true }
            )
            .setFooter({ text: 'Kayıt Sistemi' });

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('register_male')
                    .setLabel('Erkek')
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji('♂️'),
                new ButtonBuilder()
                    .setCustomId('register_female')
                    .setLabel('Kadın')
                    .setStyle(ButtonStyle.Danger) // Using Red/Danger for contrast or Pink if available (Pink is secondary usually, let's stick to standard styles)
                    .setEmoji('♀️')
            );

        await message.channel.send({ embeds: [embed], components: [row] });
    }
});

// Handle interaction (button clicks)
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isButton()) return;

    const { customId, member, guild } = interaction;

    if (customId === 'register_male' || customId === 'register_female') {
        const unregisteredRole = guild.roles.cache.get(config.roles.unregistered);
        const maleRole = guild.roles.cache.get(config.roles.male);
        const femaleRole = guild.roles.cache.get(config.roles.female);

        if (!unregisteredRole || !maleRole || !femaleRole) {
            return interaction.reply({ content: 'Rol yapılandırması hatalı. Lütfen yöneticiye bildirin.', ephemeral: true });
        }

        try {
            // Check if user already has the target role to avoid redundancy
            const targetRole = customId === 'register_male' ? maleRole : femaleRole;

            if (member.roles.cache.has(targetRole.id)) {
                return interaction.reply({ content: 'Zaten kayıtlısınız!', ephemeral: true });
            }

            await member.roles.remove(unregisteredRole);
            await member.roles.add(targetRole);

            const genderText = customId === 'register_male' ? 'Erkek' : 'Kadın';
            await interaction.reply({ content: `Başarıyla **${genderText}** olarak kayıt oldunuz!`, ephemeral: true });

        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Kayıt işleminde bir hata oluştu.', ephemeral: true });
        }
    }
});

client.login(process.env.DISCORD_TOKEN);
