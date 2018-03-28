package devs.team.net.cucumber.stepdefs;

import devs.team.net.SistemaAguaPotableApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = SistemaAguaPotableApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
