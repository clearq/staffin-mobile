import { StyleSheet, Text, View, Modal, SafeAreaView, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import React from 'react'
import { Sizes, theme } from '@/constants/Theme'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@rneui/themed'
import { Button } from '@/components/UI/Button'

interface props {
  visible: boolean
  onClose: () => void
}

const PrivacyPolicyDialog = ({visible, onClose}:props) => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  function trimIndent(raw: string) {
  const lines = raw.split('\n');
  const trimmed = lines
    // Ignore fully blank lines at start/end
    .filter(line => line.trim().length > 0)
    // Find min indent
    .map(line => line.match(/^(\s*)/)![0].length)
    .reduce((a, b) => Math.min(a, b), Infinity);
  return lines.map(line => line.slice(trimmed)).join('\n');
}
  
  return (
    <SafeAreaView style={{...styles.centeredView}}>
      <Modal
        visible={visible}
        animationType="slide"
        transparent={true}
      >
        <View
          style={{...styles.centeredView }}
        >
          <View
            style={{
              ...styles.modalView,
              backgroundColor: theme.colors.background
            }}
          >

            <View 
              style={{ 
                width: '100%', 
                maxHeight: Dimensions.get('window').height * 0.7 

              }}
            >

              <ScrollView>
                <Text
                  style={{
                    textAlign: 'left',
                    justifyContent: 'flex-start',
                  }}
                >
                  {trimIndent(`
                    1. Vem ansvarar för dina uppgifter
                    Denna plattform drivs av Clear Q, organisationsnummer 559263-1732, med säte i Arlöv, Sverige.
                    Har du frågor om hur vi behandlar personuppgifter? Kontakta oss på:
                    📧 support@staffin.pro
                    📞 040 - 30 04 32

                    2. Vilka uppgifter samlar vi in?
                    När du använder vår plattform samlar vi in:
                    Namn, kontaktuppgifter, CV, kompetenser och arbetslivserfarenhet
                    Information om jobb du visat intresse för eller har sökt
                    Teknisk information (t.ex. IP-adress, enhet, webbläsare)

                    3. Varför samlar vi in dessa uppgifter?
                    Vi behandlar dina personuppgifter för att:
                    Skapa och hantera ditt konto
                    Matcha dig med relevanta jobbannonser
                    Möjliggöra att du söker tjänster via plattformen
                    Kommunicera med dig om jobbansökningar eller andra funktioner
                    Utveckla och förbättra plattformens funktioner

                    4. Exempelannonser och simuleringar
                    Vi använder ibland exempelannonser (så kallade demoannonser) för att visa hur plattformen fungerar. Dessa representerar inte faktiska tjänster och går inte att söka. Om du interagerar med en sådan annons hanteras din information endast internt och delas inte med något företag.

                    5. Rättslig grund för behandling
                    Behandlingen av dina personuppgifter sker med stöd av:
                    Det avtal du ingår med oss när du skapar ett konto
                    Ditt samtycke (t.ex. när du accepterar denna policy)
                    Vårt berättigade intresse att driva och förbättra plattformen
                    Vår plattform använder automatiserad behandling för att exempelvis föreslå relevanta jobbannonser baserat på din profil. Inga beslut som har rättslig eller liknande betydande påverkan på dig fattas dock enbart automatiskt – du väljer själv vilka jobb du vill ansöka till.
                    Samtycke kan till exempel krävas om du godkänner att din profil visas för arbetsgivare, prenumererar på nyhetsbrev eller deltar i tester via plattformen.

                    6. Hur länge sparar vi dina uppgifter?
                    Vi sparar dina uppgifter så länge du har ett konto hos oss och upp till 12 månader efter att det avslutats. Du kan när som helst begära att få ditt konto raderat.

                    7. Dina rättigheter
                    Du har rätt att:
                    Få tillgång till dina personuppgifter
                    Få felaktiga uppgifter rättade
                    Begära att vi raderar dina uppgifter
                    Invända mot viss behandling
                    Få ut dina uppgifter i ett maskinläsbart format
                    Du har även rätt att lämna in klagomål till Integritetsskyddsmyndigheten (IMY) om du anser att vår behandling inte sker enligt gällande lagstiftning. Mer information finns på www.imy.se.
                    Kontakta oss om du vill utöva någon av dessa rättigheter.

                    8. Tredje parter och överföring
                    Vi delar inte dina personuppgifter med andra företag utan ditt samtycke, förutom när det krävs enligt lag eller är nödvändigt för att driva plattformen (t.ex. tekniska driftleverantörer).
                    Vid vissa uppdrag eller jobbansökningar som gäller arbetsgivare utanför Sverige eller EU/EES kan dina personuppgifter komma att överföras till tredjeland. I sådana fall ser vi till att skyddsnivån är tillräcklig enligt gällande dataskyddsregler, exempelvis genom användning av EU-kommissionens standardavtalsklausuler.

                    9. Säkerhet
                    Vi vidtar lämpliga tekniska och organisatoriska säkerhetsåtgärder för att skydda dina uppgifter mot obehörig åtkomst, förlust eller manipulation.

                    10. Kontakt
                    Har du frågor om integritet eller dataskydd?
                    📧 support@staffin.pro
                  `)}
                </Text>

                <View
                  style={{
                    marginVertical: Sizes.fixPadding
                  }}
                >
                  <Button  
                    title={`${t("close")}`}
                    onPress={onClose}
                    size={'lg'}
                    type={'default'}
                    color={'primary'}
                    titleColor={theme.colors.white}
                  />
                </View>
              </ScrollView>
            </View>

          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

export default PrivacyPolicyDialog

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    borderRadius: theme.spacing?.md,
    padding: theme.spacing?.md,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
})