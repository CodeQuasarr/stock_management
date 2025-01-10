// Fonction pour transformer les erreurs venant de l'API en un format plus lisible
const formatErrors = (errors: any) =>{
    const formattedErrors = Object.values(errors).flat().map(error => `- ${error}`);

    // Joindre les erreurs en lignes formatées
    return formattedErrors.join('<br>');
}

export default formatErrors;
