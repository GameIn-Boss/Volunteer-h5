/**
 * @file 协议
 */

/* global wx:false */
import React from "react";
import autoBind from "react-autobind";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./agree.css";

class Agree extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillReceiveProps() { }

  componentWillUnmount() { }

  render() {
    return (
      <div className="page-introduce">
        <h5 className="page-introduce-subtitle page-introduce-take-up">BMW企业志愿者协会线上平台</h5>
        <h5 className="page-introduce-subtitle page-introduce-take-up">用户使用协议</h5>
        <h5 className="page-introduce-subtitle page-introduce-take-up">BMW Corporate Volunteer Association Online Platform</h5>
        <h5 className="page-introduce-subtitle page-introduce-take-up">User agreement</h5>
        <div className="page-introduce-content">
          BMW企业志愿者协会线上平台（以下简称“本平台”）是BMW为企业员工、经销商、车主志愿者及志愿者活动提供的一个数字化平台。在确认注册前，请您务必仔细阅读、充分理解本协议的全部内容。
          <br />
          The BMW Corporate Volunteer Association online platform (hereinafter referred to as "the platform") is a digital platform provided by BMW for corporate associates, dealers, car owner volunteers and volunteer activities. Before confirming the registration, please read carefully and fully understand all the contents of this agreement.
          <br />
          一、注册条款的接受
          <br />
          I.Acceptance of registration terms
          <br />
          一旦您在登录页面点击或勾选“阅读并同意接受用户协议”相关内容并通过注册程序或其他任何方式使用或接受本平台任何服务，即表示您已经阅读并且同意本用户协议，自愿接受本用户协议中的全部条款。请您在决定注册或使用服务前再次确认您已知悉并完全理解本协议的全部内容。
          <br />
          Once you click or check the relevant content of "read and authorize the user agreement" on the login page and use or accept any service on this platform through the registration process or any other means, it means that you have read and agreed to this user agreement and voluntarily accept all terms in the agreement. Please confirm that you know and fully understand all the contents of this agreement before deciding to register or use the service.
          <br />
          二、用户注册
          <br />
          II.User registration
          <br />
          1. 自愿成为志愿者，并自愿加入BMW企业志愿者协会的BMW员工、经销商、车主可注册并使用本平台。
          BMW associates, dealers and car owners who voluntarily become volunteers and join BMW Corporate Volunteer Association can register and use this platform.
          <br />
          2. 在申请账号时，请真实、准确、完整地提供您的个人信息（包括但不限于您的姓名、员工号、身份信息、邮箱、联系电话等），进行实名注册，以便在必要时联系您，或为您提供更好的使用体验。如果因用户所提供的注册信息不合法、不真实、不准确或未及时更新，从而导致相关法律责任或不利后果的，用户将承担相应的法律责任及不利后果。
          <br />
          When applying for an account, please provide your personal information truthfully, accurately and completely (including but not limited to your name, Q number, identity information, email address, phone number, etc.), in order to contact you when necessary, or provide you with a better experience. If the registration information provided by the user is illegal, untrue, inaccurate or not updated in a timely manner, which results in related legal liabilities or adverse consequences, the user will bear the corresponding legal liabilities and adverse consequences.
          <br />
          3. 关于实名注册
          <br />
          Real-name authentication registration
          <br />
          《志愿服务条例》第二章第七条要求：志愿者可以将其身份信息、服务技能、服务时间、联系方式等个人基本信息，通过国务院民政部门指定的志愿服务信息系统自行注册，也可以通过志愿服务组织进行注册。志愿者提供的个人基本信息应当真实、准确、完整。
          <br />
          Volunteer Service Regulations requires: Volunteers can register their basic personal information, such as identity information, service skills, service time, and contact information, through the volunteer service information system designated by the Civil Affairs Department of the State Council, or through volunteer service organizations. The basic personal information provided by volunteers should be true, accurate and complete.
          <br />
          同时，为了落实中央关于志愿服务制度化和信息化建设有关部署要求的重要举措，提供与符合《志愿服务信息系统基本规范》的其他系统对接交换数据接口，因此，要求所有志愿者必须实名注册。
          <br />
          At the same time, the central government requires all systems to provide data interfaces for docking and exchanging data with other volunteer service systems in order to complete the institutionalization and informatization of volunteer services in the future. Therefore, all volunteers are required to register with their real names.
          <br />
          三、用户信息
          <br />
          III.User Information
          <br />
          1. 用户在注册账号或使用本平台的过程中，需要填写或提交必要的信息，如法律法规、规章规范性文件（以下称“法律法规”）规定的需要填写的身份信息。如用户提交的信息不完整或不符合法律法规的规定，则无法使用本平台或在使用本平台的过程中受到限制。
          <br />
          In the process of registering an account or using this platform, the user needs to fill in or submit necessary information, such as the identity information required by laws, regulations, and regulatory documents (hereinafter referred to as "laws and regulations"). If the information submitted by the user is incomplete or does not comply with the laws and regulations, the user cannot use the platform or be restricted in the process of using the platform.
          <br />
          2. 个人信息是指以电子或者其他方式记录的能够单独或者与其他信息结合识别特定自然人身份或者反映特定自然人活动情况的各种信息，包括但不限于姓名、出生日期、身份证件号码、个人生物识别信息、地址、电话。
          <br />
          Personal information refers to various information that can be individually or combined with other information to identify the identity of a specific natural person or reflect the activities of a specific natural person, including but not limited to name, date of birth, ID number, personal biology identification information, address, phone number.
          <br />
          个人敏感信息是指一旦泄露、非法提供或滥用可能危及人身和财产安全，或极易导致个人名誉、身心健康受到损害或歧视性待遇等的个人信息。一般而言，个人身份证件号码、银行账号、精准定位信息等被视为个人敏感信息。
          <br />
          Personal sensitive information refers to personal information that, once leaked, illegally provided, or misused, may endanger personal and property safety, or easily lead to personal reputation, physical and mental health damage, or discriminatory treatment. Generally speaking, personal ID number, bank account number, precise location information, etc. are regarded as personal sensitive information.
          <br />
          3. 尊重用户个人信息的私有性是本平台的一贯制度，本平台将采取合理的措施确保用户个人信息安全，防止在本平台中收集的用户个人信息泄露、毁损或丢失。在发生前述情形或者本平台发现存在发生前述情形的可能时，将及时采取补救措施。
          <br />
          Respecting the privacy of users' personal information is a consistent system of this platform. This platform will take reasonable measures to ensure the safety of users' personal information and prevent the leakage, damage or loss of users' personal information collected on this platform. When the foregoing situation occurs or the platform finds that the foregoing situation may occur, remedial measures will be taken in time.
          <br />
          4. 用户理解并同意，为了更好的共享志愿服务平台，帮助用户积累志愿服务时间，本平台未来有计划与其他官方平台进行信息共享。除此之外，本平台未经用户同意不向任何第三方公开、透露用户个人信息。但以下特定情形除外：
          <br />
          The user understands and agrees that in order to better share the volunteer service platform and help users accumulate volunteer hour, this platform plans to share information with other official platforms in the future. In addition, this platform does not disclose users’ personal information to any third party without users' consent. Except in the following specific situations:
          <br />
          (1) 本平台根据法律法规规定或有权机关的指示提供用户的个人信息。
          <br />
          This platform provides users' personal information in accordance with laws and regulations or instructions from competent authorities.
          <br />
          (2) 由于用户将其用户密码告知他人或与他人共享注册帐户与密码，由此导致的任何个人信息的泄漏，或其他非因本平台原因导致的个人信息的泄露。
          <br />
          Any leakage of personal information caused by the user telling others of his user password or sharing the registered account and password with others, or other personal information leakage not caused by the platform.
          <br />
          (3) 用户自行向第三方公开其个人信息。
          <br />
          Users disclose their personal information to third parties by themselves.
          <br />
          (4) 任何由于黑客攻击、电脑病毒侵入及其他不可抗力事件导致用户个人信息的泄露。
          <br />
          Any leakage of personal information of users due to hacker attacks, computer virus intrusion and other force majeure events.
          <br />
          5. 用户同意本平台可在以下事项中使用用户的个人信息：
          <br />
          The user agrees that this platform may use the user's personal information in the following matters:
          <br />
          (1) 本平台向用户及时发送重要通知，如平台更新、本协议条款的变更。
          <br />
          This platform sends important notices to users in a timely manner, such as platform updates and changes to the terms of this agreement.
          <br />
          (2) 本平台内部进行审计、数据分析和研究等，以改进本平台的产品、服务和与用户之间的沟通。
          <br />
          Auditing, data analysis and research are conducted internally on this platform to improve the products, services and communication with users on this platform.
          <br />
          (3) 依本协议约定，本平台管理、审查用户信息及进行处理措施。
          <br />
          In accordance with this agreement, this platform manages and reviews user information and takes processing measures.
          <br />
          (4) 适用法律法规规定的其他事项。
          <br />
          Other matters stipulated by applicable laws and regulations.
          <br />
          除上述事项外，如未取得用户事先同意，本平台不会将用户个人信息使用于任何其他用途。
          <br />
          In addition to the above matters, this platform will not use the user's personal information for any other purposes without the user's prior consent.
          <br />
          6. 若用户未满18周岁，则为未成年人，应在监护人监护、指导下阅读本协议和使用本平台。任何18岁以下的未成年人注册账号或使用本平台应事先取得家长或其法定监护人的书面同意。
          <br />
          If the user is under the age of 18, he should read this agreement and use this platform under the supervision and guidance of a guardian. Any minors under the age of 18 who register for an account or use this platform should obtain prior written consent from their parents or their legal guardians.
          <br />
          7. 本平台重视对未成年人个人信息的保护。本平台将依赖用户提供的个人信息判断用户是否为未成年人。除根据法律法规的规定及有权机关的指示披露外，本平台不会使用或向任何第三方透露未成年人的聊天记录及其他个人信息。除本协议约定的例外情形外，未经监护人事先同意，本平台不会使用或向任何第三方透露未成年人的个人信息。
          <br />
          This platform attaches importance to the protection of personal information of minors. This platform will rely on the personal information provided by the user to determine whether the user is a minor. Except for disclosure in accordance with laws and regulations and instructions from competent authorities, this platform will not use or disclose to any third party the chat records and other personal information of minors. Except for the exceptions stipulated in this agreement, this platform will not use or disclose the personal information of minors to any third party without the prior consent of the guardian.
          <br />
          8. 一般情况下，用户可随时浏览、修改或删除自己提交的信息，但出于安全性和身份识别（如号码申诉服务）的考虑，用户可能无法修改注册时提供的初始注册信息及其他验证信息。
          <br />
          Under normal circumstances, users can browse, modify or delete the information submitted by themselves at any time, but due to security and identification (such as number appeal service) considerations, users may not be able to modify the initial registration information and other verification infromation provided during registration.
          <br />
          四、用户权利
          <br />
          IV.User rights
          <br />
          1.注册用户可查看和修改个人信息。
          <br />
          Users can view and modify personal information.
          <br />
          2.注册用户可参与平台内活动。
          <br />
          Users can participate in activities on the platform.
          <br />
          3.注册用户可加入平台内志愿组织。
          <br />
          Users can join volunteer organizations on the platform.
          <br />
          4.注册用户可学习平台内志愿服务相关知识。
          <br />
          Users can learn about volunteer services on the platform.
          <br />
          5.注册用户可在平台发布和传播志愿服务相关内容。
          <br />
          Users can publish and disseminate volunteer service related content on the platform.
          <br />
          6.注册用户可参与平台或组织激励。
          <br />
          Users can obtain platform or organizational rewards.
          <br />
          7.注册用户可查看个人证书及志愿排行榜。
          <br />
          Users can view personal certificates and volunteer rankings.

          <br />
          五、用户义务
          <br />
          V.User obligations
          <br />
          本平台一直致力于为用户提供文明健康、规范有序的网络环境，用户不得利用本平台账号或本平台及服务制作、复制、发布、传播侵犯其他用户或第三方合法权益的内容，包括但不限于：
          <br />
          This platform has always been committed to providing users with a civilized, healthy, standardized and orderly network environment. Users may not use this platform account or this platform and services to produce, copy, publish, or disseminate content that infringes the legal rights of other users or third parties, including but not limited to:
          <br />
          1.发布、传送、传播、储存违反国家法律法规禁止的内容：
          Publish, transmit, disseminate, and store content that violates national laws and regulations:
          （1）违反宪法确定的基本原则的。
          Violation of the basic principles established by the Constitution of the People's Republic of China.
          （2）危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的。
          Endanger national security, leak state secrets, subvert state power, and undermine national unity.
          （3）损害国家荣誉和利益的。
          Damage to national honor and interests.
          （4）煽动民族仇恨、民族歧视，破坏民族团结的。
          Inciting ethnic hatred, ethnic discrimination, and undermining ethnic unity.
          （5）破坏国家宗教政策，宣扬邪教和封建迷信的。
          Undermining the state's religious policy, promoting cults and feudal superstition.
          （6）散布谣言，扰乱社会秩序，破坏社会稳定的。
          Spread rumors, disrupt social order, and undermine social stability.
          （7）散布淫秽、色情、赌博、暴力、恐怖或者教唆犯罪的。
          Spread obscenity, pornography, gambling, violence, terror, or instigate crime.
          （8）侮辱或者诽谤他人，侵害他人合法权益的。
          Insulting or slandering others, infringing on the legal rights of others.
          （9）煽动非法集会、结社、游行、示威、聚众扰乱社会秩序。
          Inciting illegal assemblies, associations, procession, demonstrations, gathering crowds to disrupt social order.
          （10）以非法民间组织名义活动的。
          Activities in the name of illegal civil organizations.
          （11）不符合遵守法律法规、社会主义制度、国家利益、公民合法利益、公共秩序、社会道德风尚和信息真实性等“七条底线”要求的。
          Failure to comply with the "seven bottom lines" requirements of compliance with laws and regulations, the socialist system, national interests, citizens' legitimate interests, public order, social morals and customs, and information authenticity
          （12）含有法律、行政法规禁止的其他内容的。
          Contains other content prohibited by laws and administrative regulations.
          <br />
          2.发布、传送、传播、储存侵害他人名誉权、肖像权、知识产权、商业秘密等合法权利的内容。
          Publish, transmit, disseminate, and store content that infringes on the legal rights of others' reputation rights, portrait rights, intellectual property rights, and trade secrets.
          3.涉及他人隐私、个人信息或资料的。
          Involving the privacy, personal information or data of others.
          4.发表、传送、传播骚扰、广告信息及垃圾信息或含有任何性或性暗示的。
          Publish, transmit, disseminate harassment, advertising information and spam or contain any sexual or sexual implication.
          5.其他违反法律法规、政策及公序良俗、社会公德或干扰本平台正常运营和侵犯其他用户或第三方合法权益内容的信息。
          Other information that violates laws, regulations, policies, public order and good customs, social ethics, or interferes with the normal operation of this platform, and violates the legitimate rights and interests of other users or third parties.
          6.不得发布任何与本平台志愿服务目的不适之信息。
          Do not publish any information that is inappropriate for the purpose of volunteer service on this platform.
          7.若用户在平台发表或传播存在上述情况或平台有理由怀疑其上传的信息、发布的内容违反前述规定的，平台随时有权删除或屏蔽相关内容，包括但不限于用户的注册名称、个人资料、发布的信息等。同时有权暂停或终止该用户使用其账号，或暂停或终止提供本平台提供的全部或部分服务。本平台保留追究法律责任的权利，并由此导致的一切法律后果由用户个人承担。
          If the user publishes or disseminates the above conditions on the platform or the platform has reason to suspect that the uploaded information or published content violates the foregoing regulations, the platform has the right to delete or block the relevant content at any time, including but not limited to the user’s registered name, personal information, published information, etc. At the same time, it has the right to suspend or terminate the user's use of his account, or to suspend or terminate the provision of all or part of the services provided by this platform. This platform reserves the right to pursue legal liabilities, and all legal consequences resulting from this will be borne by the user.

          <br />
          六、法律责任
          <br />
          VI.Legal responsibility
          <br />
          1．如果本平台发现或收到他人举报或投诉用户违反本协议约定的，本平台有权不经通知随时对相关内容，包括但不限于用户资料、聊天记录进行审查、删除，并视情节轻重对违规账号处以包括但不限于警告、账号封禁、设备封禁、功能封禁的处罚，且通知用户处理结果。
          <br />
          If this platform finds or receives reports or complaints from others that the user violates this agreement, the platform has the right to review and delete related content, including but not limited to user information and chat records, at any time without notice, and depending on the severity of the circumstances, penalties including but not limited to warnings, account bans, device bans, and function bans will be imposed on violating accounts, and the user is notified of the processing results.
          <br />
          2．因违反用户协议被封禁的用户，可向本平台网站相关页面提交申诉，本平台将对申诉进行审查，并自行合理判断决定是否变更处罚措施。
          <br />
          Users who are banned for violating the user agreement can submit an appeal to the relevant page of the platform. The platform will review the appeal and make a reasonable judgment on its own to decide whether to change the punishment measures.
          <br />
          3．用户理解并同意，本平台有权依合理判断对违反有关法律法规或本协议规定的行为进行处罚，对违法违规的任何用户采取适当的法律行动，并依据法律法规保存有关信息向有关部门报告等，用户应承担由此而产生的一切法律责任。
          <br />
          The user understands and agrees this platform has the right to punish violations of relevant laws and regulations or the provisions of this agreement based on reasonable judgments, take appropriate legal actions against any users who violate laws and regulations, and save relevant information in accordance with laws and regulations to report to relevant departments, etc., the user shall bear all legal responsibilities arising therefrom.
          <br />
          4．用户理解并同意，因用户违反本协议或相关服务条款的规定，导致或产生第三方主张的任何索赔、要求或损失，用户应当独立承担责任；本平台因此遭受损失的，用户也应当一并赔偿。
          <br />
          The user understands and agrees that the user shall be solely responsible for any claims, demands or losses claimed by a third party due to the user's violation of the provisions of this agreement or related terms of service. The user shall also be responsible for any losses caused by this platform.

          <br />
          七、不可抗力及其他免责事由
          <br />
          VII.Force majeure and other exemptions
          <br />
          1. 用户理解并确认，在使用本平台的过程中，可能会遇到不可抗力等风险因素，使本服务发生中断。不可抗力是指不能预见、不能克服并不能避免且对一方或双方造成重大影响的客观事件，包括但不限于自然灾害如洪水、地震、瘟疫流行和风暴等以及社会事件如战争、动乱、政府行为等。出现上述情况时，本平台将努力在第一时间与相关单位配合，及时进行修复，但是由此给用户或第三方造成的损失，本平台及合作单位在法律允许的范围内免责。
          <br />
          The user understands and confirms that in the process of using the platform, risk factors such as force majeure may be encountered, which may cause the interruption of the service. Force majeure refers to an objective event that cannot be foreseen, cannot be overcome, and cannot be avoided, and has a significant impact on one or both parties, including but not limited to natural disasters such as floods, earthquakes, epidemics and storms, etc., and social events such as wars, unrest, government actions, etc. When the above situation occurs, the platform will work hard to cooperate with the relevant units at the first time and repair them in a timely manner. However, the platform and cooperative units will be exempted from liability within the scope permitted by law for the losses caused to users or third parties.
          <br />
          2. 本平台同大多数互联网平台一样，受包括但不限于用户原因、网络服务质量、社会环境等因素的差异影响，可能受到各种安全问题的侵扰，如他人利用用户的资料，造成现实生活中的骚扰；用户下载安装的其他软件或访问的其他网站中可能含有病毒、木马程序或其他恶意程序，威胁到用户的计算机信息和数据的安全，继而影响本服务的正常使用等。用户应加强信息安全及使用者资料的保护意识，注意加强密码保护，以免遭致损失。
          <br />
          Like most Internet platforms, this platform is affected by differences in factors including but not limited to user reasons, network service quality, social environment, etc., and may be harassed by various security issues, such as the use of user information by others to cause harassment in real life. Other software downloaded and installed by users or other websites visited may contain viruses, Trojan horse programs or other malicious programs, which threaten the security of users' computer information and data, and then affect the normal use of this service. Users should strengthen the awareness of information security and user data protection, and pay attention to strengthening password protection to avoid losses.
          <br />
          3. 用户理解并确认，本平台存在因不可抗力、计算机病毒或黑客攻击、系统不稳定、用户所在位置、用户关机以及其他任何技术、互联网络、通信线路原因等造成的服务中断或不能满足用户要求的风险，因此导致的用户任何损失，本平台不承担任何责任。
          <br />
          The user understands and confirms that this platform has the risk of service interruption or failure to meet user requirements due to force majeure, computer viruses or hacker attacks, system instability, user location, user shutdown, and any other technology, Internet, communication line reasons, etc., the platform does not bear any responsibility for any loss caused by the user.
          <br />
          4. 用户理解并确认，在使用本平台过程中存在来自任何他人的包括误导性的、欺骗性的、威胁性的、诽谤性的、令人反感的或非法的信息，或侵犯他人权利的匿名或冒名的信息，以及伴随该等信息的行为，因此导致的用户的任何损失，本平台不承担任何责任。
          <br />
          The user understands and confirms that there is misleading, deceptive, threatening, defamatory, offensive or illegal information from any other person in the process of using this platform, or anonymous or pseudonymous information that infringes on the rights of others, and the behavior accompanying such information, this platform does not bear any responsibility for any loss of users caused thereby.
          <br />
          5. 用户理解并确认，本平台需要定期或不定期地对平台或相关的设备进行检修或者维护，如因此类情况而造成服务在合理时间内的中断，本平台无需为此承担任何责任，但本平台应事先进行通告。
          <br />
          The user understands and confirms that the platform needs to overhaul or maintain the platform or related equipment on a regular or irregular basis. If such a situation causes service interruption within a reasonable time, the platform does not need to bear any responsibility for this, but it should be notified in advance.
          <br />
          6. 本平台依据法律法规、本协议约定获得处理违法违规或违约内容的权利，该权利不构成本平台的义务或承诺，本平台不能保证及时发现违法违规或违约行为或进行相应处理。
          <br />
          This platform obtains the right to deal with illegal or breached content in accordance with laws, regulations, and this agreement. This right does not constitute an obligation or promise of this platform. This platform cannot guarantee timely detection of violations of laws or regulations or breaches of contract or deal with them accordingly.
          <br />
          7. 在任何情况下，本平台均不对任何间接性、后果性、惩罚性、偶然性、特殊性或刑罚性的损害，承担责任（即使本平台已被告知该等损失的可能性亦然）。
          <br />
          Under no circumstances will this platform be liable for any indirect, consequential, punitive, incidental, special or criminal damages (even if the platform has been notified of the possibility of such losses).

          <br />
          八、服务的变更、中断、终止
          <br />
          VIII.Service change, interruption and termination
          <br />
          1. 鉴于网络服务的特殊性，用户同意本平台有权随时变更、中断或终止部分或全部的服务。本平台变更、中断或终止的服务，应当在变更、中断或终止之前通知用户。
          <br />
          In view of the particularity of network services, users agree that this platform has the right to change, interrupt or terminate some or all of the services at any time. Users should be notified of changes, interruptions or termination of services on this platform before the changes, interruptions or terminations.
          <br />
          2. 如发生下列任何一种情形，本平台有权变更、中断或终止向用户提供的服务，而无需对用户或任何第三方承担任何责任：
          <br />
          In the event of any of the following situations, this platform has the right to change, interrupt or terminate the services provided to users without any responsibility for the user or any third party:
          (1) 根据法律规定用户应提交真实信息，而用户提供的个人资料不真实、或与注册时信息不一致又未能提供合理证明。
          According to the law, users should submit real information, and the personal information provided by users is not true or inconsistent with the information at the time of registration and fails to provide reasonable proof.
          (2) 用户违反相关法律法规或本协议的约定。
          The user violates relevant laws and regulations or the provisions of this agreement.
          (3) 按照法律规定或有权机关的要求。
          In accordance with the law or the requirements of the competent authority.
          (4) 出于安全的原因或其他必要的情形。
          For security reasons or other necessary circumstances.

          <br />
          九、其他
          <br />
          X.Other
          <br />
          1. 本协议的成立、生效、履行、解释及纠纷解决，适用于中华人民共和国法律。若用户和本平台之间发生任何纠纷或争议，首先应友好协商解决，协商不成的，用户同意将纠纷或争议提交北京市朝阳区人民法院管辖。
          <br />
          The establishment, effectiveness, performance, interpretation and dispute resolution of this agreement are applicable to the laws of the People's Republic of China. If any dispute or controversy occurs between the user and this platform, it should first be settled through friendly negotiation. If the negotiation fails, the user agrees to submit the dispute to the people's court of Beijing Chaoyang district.
          <br />
          2. 本协议的任何条款无论因何种原因无效或不具可执行性，其余条款仍有效，对双方具有约束力。
          <br />
          No matter any clause of this agreement is invalid or unenforceable for any reason, the remaining clauses are still valid and binding on both parties.

        </div>
      </div>
    )
  }
}

Agree.title = "用户协议";
Agree.propTypes = {};

export default connect(
  state => state.my || {},
  dispatch => bindActionCreators({}, dispatch)
)(Agree);
